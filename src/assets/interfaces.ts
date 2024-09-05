import { RegisterOptions, FieldValues } from "react-hook-form";

export interface IFormField {
    id: string;
    error: {
        id: string,
        css: string
    };
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'select' | 'textarea' | 'radio';
    options?: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
    validation?: RegisterOptions;
    icon?: React.ReactNode;
    value?: string,
    css: {
        wrapper?: string,
        label?: string,
        input: string,
        icon?: string,
        error?: string
    }
}

export interface ISubmitButtonProps {
    id: string
    label: string,
    type: 'button' | 'submit' | 'reset',
    css: string,
    disabled?: boolean,
    onClick?: () => void
}

export interface DynamicFormProps {
    fields: IFormField[];
    onSubmit: (data: FieldValues) => void;
    button: ISubmitButtonProps
}