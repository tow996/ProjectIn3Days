import { useForm } from 'react-hook-form';
import PageLayout from '../layout/PageLayout'
import type { ContactFormData } from '../types/contact';
import api from '../api/axios';
import { toast } from 'react-toastify';
import Input from '../components/reusable/Input';
import { getValidationRules } from '../utils/validationRules';
import { useMutation } from '@tanstack/react-query';

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const mutation = useMutation({
        mutationFn: (data: ContactFormData) => {
            return api.post("/send_message/", data);
        },
        onSuccess: () => {
            reset();
            toast.success("Message sent successfully!");
        },
        onError: () => {
            toast.error("Failed to send message. Please try again.");
        }
    });


    const onSubmit = (data: ContactFormData) => {
        mutation.mutate(data);
    };

    return (
        <PageLayout>
            <title>Contact - Nexus PC</title>
            <div className="contact-page">
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out!</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className='page-form'>
                    <Input 
                        id="email"
                        label="Email"
                        placeholder="Enter your email..."
                        className="form-group"
                        customClass="icon email"
                        type="email"
                        register={register("email", getValidationRules("email"))}
                        error={errors.email?.message}
                    />
                    <Input
                        id="title"
                        label="Title"
                        placeholder="What do you want to ask us?"
                        className="form-group"
                        customClass="icon question"
                        type="text"
                        register={register("title", getValidationRules("title"))}
                        error={errors.title?.message}
                    />
                    <div className="form-group">
                        <label htmlFor="message">Message {errors.message && <span className="error-text">- {errors.message.message}</span>}</label>
                        <textarea
                            id="message"
                            placeholder="Enter your message..."
                            className={errors.message ? "form-control input-error" : "form-control"}
                            {...register("message", getValidationRules("message"))}
                            rows={5}
                        ></textarea>
                    </div>
                    <button type="submit">
                     {mutation.isPending ? <span className="loader"></span> : "Send Message"}
                    </button>
                </form>
            </div>
        </PageLayout>
    )
}

export default Contact