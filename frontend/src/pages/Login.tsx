import { useForm } from "react-hook-form";
import { type AuthFormData } from "../types/auth";
import { getValidationRules } from "../utils/validationRules";
import Input from "../components/reusable/Input";
import api from "../api/axios";
import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        setValue,
        reset,
        setError
    } = useForm<AuthFormData>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const user = useContext(UserContext);
    
    const navigate = useNavigate();
    const mutation = useMutation({

        mutationFn: (data: AuthFormData) => {
            return api.post("/login/", data);
        },
        onSuccess: () => {
            reset();
            user.updateUserInfo();
            navigate('/'); 
        },
        onError: () => {
            setValue("password", "");
            setError("username", {
                type: "manual",
                message: "Invalid username or password",
            });
            toast.error("Login failed. Please check your credentials.");
        },
    });

    const onSubmit = (data: AuthFormData) => {
        mutation.mutate(data);
    };

    return (
        <AuthLayout>
            <title>Login - Nexus PC</title>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <h1>Login</h1>
            
                <Input
                    id="username"
                    type="username"
                    label="Username"
                    placeholder="Username..."
                    className="auth-input-container"
                    customClass="icon user"
                    register={register("username", getValidationRules("username"))}
                    error={isSubmitted ? errors.username?.message : undefined}
                />

                <Input
                    id="password"
                    type="password"
                    label="Password"
                    className="auth-input-container"
                    placeholder="Password..."
                    customClass="icon password"
                    register={register("password", getValidationRules("password"))}
                    error={isSubmitted ? errors.password?.message : undefined}
                />

                <button type="submit">
                     {mutation.isPending ? <span className="loader"></span> : "Login"}
                </button>
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </form>
        </AuthLayout>
    );
};

export default Login;