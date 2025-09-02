import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import { CartContext } from "../store/CartContext";
import { UserContext } from "../store/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../components/reusable/Input";
import { getValidationRules } from "../utils/validationRules";
import type { BillingAddress, CreateOrder } from "../types/order";
import type { CartItem } from "../store/CartContext";
import api from "../api/axios";

const createOrderAPI = async (data: CreateOrder) => {
    const response = await api.post("/orders/create/", data);
    return response.data;
};

const Checkout = () => {
    const { items, removeItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = useContext(CartContext);
    const { loggedIn } = useContext(UserContext);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BillingAddress>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    // Calculate total price from cart items
    const totalPrice = items.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0);

    const orderMutation = useMutation({
        mutationFn: createOrderAPI,
        onSuccess: () => {
            toast.success("Order created successfully!");
            clearCart();
            reset();
            setOrderSuccess(true);
        },
        onError: () => {
            toast.error("Failed to create order.");
        },
    });

    const onSubmit = (data: BillingAddress) => {
        if (!items.length) {
            toast.error("Your cart is empty.");
            return;
        }

        // Prepare order data from cart items
        const orderData: CreateOrder = {
            total_price: totalPrice,
            order_info: JSON.stringify(
                items.map(({ item, quantity }) => ({
                    product_id: item.id,
                    name: item.name,
                    quantity,
                    price: item.price,
                }))
            ),
            billing_address: data,
        };

        orderMutation.mutate(orderData);
    };

    if (orderSuccess) {
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
            <div className="checkout-page">
                
                    
                    {items.length > 0 && (
                        <section className="cart-preview">
                        <div className="cart-items-list">
                        {items.map(({ item, quantity }: CartItem) => (
                            <div key={item.id} className="cart-item">
                                <div className='image-container'>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <strong>{item.name}</strong> - { ((Number(item.price) || 0) * quantity).toFixed(2) }$
                                </div>
                                <div className="cart-item-controls">
                                    <button onClick={() => decreaseItemQuantity(item.id)} disabled={quantity <= 1}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => increaseItemQuantity(item.id)}>+</button>
                                    <button onClick={() => removeItem(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        </div>
                        <h3>Total: <span className="total-price">${totalPrice.toFixed(2)}</span></h3>
                        </section>
                    )}

                    {loggedIn && items.length > 0 ? (
                    <section className="checkout-form">
                        <h2>Billing Information</h2>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="page-form">
                        <Input
                            id="address"
                            label="Address"
                            placeholder="Enter your address..."
                            className="form-group"
                            customClass="icon location"
                            type="text"
                            register={register("address", getValidationRules("address"))}
                            error={errors.address?.message}
                        />
                        <Input
                            id="city"
                            label="City"
                            placeholder="Enter your city..."
                            className="form-group"
                            customClass="icon city"
                            type="text"
                            register={register("city", getValidationRules("city"))}
                            error={errors.city?.message}
                        />
                        <Input
                            id="state"
                            label="State"
                            placeholder="Enter your state..."
                            className="form-group"
                            customClass="icon state"
                            type="text"
                            register={register("state", getValidationRules("state"))}
                            error={errors.state?.message}
                        />
                        <Input
                            id="postal_code"
                            label="Postal Code"
                            placeholder="Enter postal code..."
                            className="form-group"
                            customClass="icon postal"
                            type="text"
                            register={register("postal_code", getValidationRules("postal_code"))}
                            error={errors.postal_code?.message}
                        />
                        <Input
                            id="country"
                            label="Country"
                            placeholder="Enter your country..."
                            className="form-group"
                            customClass="icon country"
                            type="text"
                            register={register("country", getValidationRules("country"))}
                            error={errors.country?.message}
                        />
                        <Input
                            id="phone_number"
                            label="Phone Number"
                            placeholder="Enter your phone number..."
                            className="form-group"
                            customClass="icon phone"
                            type="tel"
                            register={register("phone_number", getValidationRules("phone_number"))}
                            error={errors.phone_number?.message}
                        />
                        <button type="submit" disabled={orderMutation.isPending}>
                            {orderMutation.isPending ? <span className="loader"></span> : "Submit Order"}
                        </button>
                        </form>
                    </section>
                    ) : (
                    items.length === 0 && (
                        <section className="empty-cart-message">
                        <h2>Your cart is empty</h2>
                        <p>Please add items to your cart before you can check out</p>
                        </section>
                    )
                    )}

                    {!loggedIn && items.length > 0 && (
                    <section className="login-register-prompt">
                        <h2>
                        Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to checkout
                        </h2>
                    </section>
                    )}


            </div>
        </PageLayout>
    );
};

export default Checkout;
