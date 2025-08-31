import { type FC } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
    id: string;
    label: string;
    customClass?: string;
    placeholder?: string;
    className: string;
    type?: string;
    register: UseFormRegisterReturn;
    error?: string;
}

const Input: FC<InputProps> = ({ id, label, placeholder, className, customClass, type = "text", register, error }) => {
    return (
        <div className={className}>
            <label htmlFor={id}>{label} {error && <span className="error-text">- {error}</span>}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
                className={error ? `${customClass} input-error` : `${customClass}`}
            />
            
        </div>
    );
};

export default Input;
