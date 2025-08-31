import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from '../layout/PageLayout';
import NotFound from './NotFound';
import api from '../api/axios';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '../components/reusable/Input';
import { getValidationRules } from '../utils/validationRules';
import type { BillingAddress, CreateOrder } from '../types/order';
import type { PCBuild } from '../types/builder';

const validateBuildAPI = async (build: PCBuild) => {
    console.log(build);
    const response = await api.post('/builder/validate_build', { build });
    return response.data.isValid;
};

const createOrderAPI = async (data: CreateOrder) => {
    const response = await api.post('/orders/create/', data);
    return response.data;
};


const Checkout = () => {
    const { id } = useParams<{ id: string }>();
    const [build, setBuild] = useState<PCBuild | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BillingAddress>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const orderMutation = useMutation({
        mutationFn: createOrderAPI,
        onSuccess: () => {
            sessionStorage.removeItem(id || '');
            reset();

        },
        onError: () => {
            toast.error('Failed to create order.');
        },
    });

    // Load & validate build on mount
    useEffect(() => {
        const init = async () => {
            if (!id) {
                setError('No build ID provided.');
                setLoading(false);
                return;
            }

            const storedBuild = sessionStorage.getItem(id);
            if (!storedBuild) {
                setError('No build data found in session storage.');
                setLoading(false);
                return;
            }

            let parsedBuild: PCBuild;

            try {
                parsedBuild = JSON.parse(storedBuild);
            } catch {
                setError('Failed to parse build data.');
                setLoading(false);
                return;
            }

            try {
                const isValid = await validateBuildAPI(parsedBuild);
                if (!isValid) {
                    setError('Invalid build configuration.');
                    // Don't return yet, setLoading at end
                } else {
                    setBuild(parsedBuild);
                }
            } catch {
                setError('Failed to validate build.');
            }

            setLoading(false);
        };

        init();
    }, [id]);

    const onSubmit = (data: BillingAddress) => {
        if (!build) {
            toast.error('Build not loaded.');
            return;
        }

        const orderData: CreateOrder = {
            total_price: build.totalPrice,
            order_info: JSON.stringify(build),
            billing_address: data,
        };

        orderMutation.mutate(orderData);
    };

    if (loading) {
        return (
            <PageLayout>
                <div>Loading...</div>
            </PageLayout>
        );
    }

    if (error || !build) {
        return (
            <PageLayout>
                {/* Pass error message to NotFound if you want to debug */}
                <NotFound />
            </PageLayout>
        );
    }

    if (orderMutation.isSuccess) {
        return (
            <PageLayout>
                <div className="checkout-page-success">
                    <h1>Thank you for your order!</h1>
                    <p>Your order has been placed successfully.</p>
                    <p>We will process your order and notify you via email.</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className='checkout-page'>

                <section className="checkout-form">
                    <h2>Billing Information</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete="off"
                        className="page-form"
                    >
                        <Input
                            id="address"
                            label="Address"
                            placeholder="Enter your address..."
                            className="form-group"
                            customClass="icon location"
                            type="text"
                            register={register('address', getValidationRules('address'))}
                            error={errors.address?.message}
                        />
                        <Input
                            id="city"
                            label="City"
                            placeholder="Enter your city..."
                            className="form-group"
                            customClass="icon city"
                            type="text"
                            register={register('city', getValidationRules('city'))}
                            error={errors.city?.message}
                        />
                        <Input
                            id="state"
                            label="State"
                            placeholder="Enter your state..."
                            className="form-group"
                            customClass="icon state"
                            type="text"
                            register={register('state', getValidationRules('state'))}
                            error={errors.state?.message}
                        />
                        <Input
                            id="postal_code"
                            label="Postal Code"
                            placeholder="Enter postal code..."
                            className="form-group"
                            customClass="icon postal"
                            type="text"
                            register={register('postal_code', getValidationRules('postal_code'))}
                            error={errors.postal_code?.message}
                        />
                        <Input
                            id="country"
                            label="Country"
                            placeholder="Enter your country..."
                            className="form-group"
                            customClass="icon country"
                            type="text"
                            register={register('country', getValidationRules('country'))}
                            error={errors.country?.message}
                        />
                        <Input
                            id="phone_number"
                            label="Phone Number"
                            placeholder="Enter your phone number..."
                            className="form-group"
                            customClass="icon phone"
                            type="tel"
                            register={register('phone_number', getValidationRules('phone_number'))}
                            error={errors.phone_number?.message}
                        />
                        <button type="submit" disabled={orderMutation.isPending}>
                            {orderMutation.isPending ? <span className="loader"></span> : 'Submit Order'}
                        </button>
                    </form>
                </section>

                
                <section className="pc-build-details">
                    <h2>PC Build Details</h2>
                    <ul>
                        {Object.entries(build).map(([key, value]) => {
                            if (typeof value === 'object' && value?.name) {
                                return (
                                    <li key={key}>
                                        <strong>{key.toUpperCase()}:</strong> {value.name} (${value.price})
                                    </li>
                                );
                            }
                            return null;
                        })}
                        <li>
                            <strong>Total Price:</strong> ${build.totalPrice}
                        </li>
                    </ul>
                </section>
            </div>
        </PageLayout>
    );
};

export default Checkout;
