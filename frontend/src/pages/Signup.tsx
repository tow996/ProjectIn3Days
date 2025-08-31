import { useForm } from "react-hook-form";
import { type AuthFormData } from "../types/auth";
import { getValidationRules } from "../utils/validationRules";
import Input from "../components/reusable/Input";
import api from "../api/axios";
import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { isAxiosError } from "axios";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        reset,
        setError, 
    } = useForm<AuthFormData>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const [message, setMessage] = useState<string | null>('Already have an account?');

    const mutation = useMutation({
        mutationFn: (data: AuthFormData) => {
            setMessage('Already have an account?');
            return api.post("/signup/", data);
        },
        onSuccess: () => {
            toast.success("User created successfully!");
            setMessage("Signup successful! You can now");
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setError("username", {
                        type: "manual",
                        message: "Username is already taken.",
                    });
                    return; 
                }
            } 
            toast.error("Signup failed. Please try again.");
        },
        onSettled: () => {
            reset();
        }
    });

    const onSubmit = (data: AuthFormData) => {
        mutation.mutate(data);
    };

    return (
        <AuthLayout>
            <title>Signup - Nexus PC</title>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <h1>Sign Up</h1>

                <Input
                    id="username"
                    label="Username"
                    placeholder="Username..."
                    customClass="icon user"
                    className="auth-input-container"
                    register={register("username", getValidationRules("username"))}
                    error={isSubmitted ? errors.username?.message : undefined}
                />

                <Input
                    id="first_name"
                    label="First Name"
                    placeholder="First name..."
                    customClass="icon user-detail"
                    className="auth-input-container"
                    register={register("first_name", getValidationRules("first_name"))}
                    error={isSubmitted ? errors.first_name?.message : undefined}
                />

                <Input
                    id="last_name"
                    label="Last Name"
                    placeholder="Last name..."
                    customClass="icon user-detail"
                    className="auth-input-container"
                    register={register("last_name", getValidationRules("last_name"))}
                    error={isSubmitted ? errors.last_name?.message : undefined}
                />

                <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Email..."
                    customClass="icon email"
                    className="auth-input-container"
                    register={register("email", getValidationRules("email"))}
                    error={isSubmitted ? errors.email?.message : undefined}
                />

                <Input
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    customClass="icon password"
                    className="auth-input-container"
                    register={register("password", getValidationRules("password"))}
                    error={isSubmitted ? errors.password?.message : undefined}
                />

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? <span className="loader"></span> : "Sign Up"}
                </button>
                <p>
                    {message} <Link to="/login">Login</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Signup;