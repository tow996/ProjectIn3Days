import { type RegisterOptions, type Path, type FieldValues } from "react-hook-form";

const validationRules: Record<string, RegisterOptions> = {
    username: {
        required: "is required",
        minLength: {
            value: 3,
            message: "must be at least 3 characters",
        },
        maxLength: {
            value: 20,
            message: "must be at most 20 characters",
        },
    },
    first_name: {
        required: "is required",
        minLength: {
            value: 2,
            message: "must be at least 2 characters",
        },
    },
    last_name: {
        required: "is required",
        minLength: {
            value: 2,
            message: "must be at least 2 characters",
        },
    },
    email: {
        required: "is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
        },
    },
    password: {
        required: "is required",
        minLength: {
            value: 6,
            message: "must be at least 6 characters",
        },
    },
    title: {
        required: "is required",
        minLength: {
            value: 3,
            message: "must be at least 3 characters",
        },
        maxLength: {
            value: 100,
            message: "must be at most 100 characters",
        },
    },
    message: {
        required: "is required",
        minLength: {
            value: 10,
            message: "must be at least 10 characters",
        },
        maxLength: {
            value: 1000,
            message: "must be at most 1000 characters",
        },
    },
    address: {
        required: "is required",
        minLength: {
            value: 5,
            message: "must be at least 5 characters",
        },
        maxLength: {
            value: 100,
            message: "must be at most 100 characters",
        },
    },
    city: { 
        required: "is required",
        minLength: {
            value: 2,
            message: "must be at least 2 characters",
        },
        maxLength: {
            value: 50,
            message: "must be at most 50 characters",
        },
    },
    state: {
        required: "is required",
        minLength: {
            value: 2,
            message: "must be at least 2 characters",
        },
        maxLength: {
            value: 50,
            message: "must be at most 50 characters",
        },
    },
    postal_code: {
        required: "is required",
        pattern: {
            value: /^[A-Za-z0-9\s-]{3,10}$/,
            message: "Invalid postal code format",
        },  
        maxLength: {
            value: 10,
            message: "must be at most 10 characters",
        },
    },
    country: {
        required: "is required",
        minLength: {
            value: 2,
            message: "must be at least 2 characters",
        },
        maxLength: {
            value: 50,
            message: "must be at most 50 characters",
        },
    },
    phone_number: {
        required: "is required",
        pattern: {
            value: /^\+?[1-9]\d{1,14}$/,
            message: "Invalid phone number format",
        },
        maxLength: {
            value: 15,
            message: "must be at most 15 characters",
        },
    },
};

export function getValidationRules<
    TFieldValues extends FieldValues,
    TFieldName extends Path<TFieldValues>
>(
    key: TFieldName
): RegisterOptions<TFieldValues, TFieldName> {
    return validationRules[key] as RegisterOptions<TFieldValues, TFieldName>;
}
