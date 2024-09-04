import { RegisterOptions, FieldValues } from "react-hook-form";
export interface IFormField {
    id: string;
    errorId: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'select';
    options?: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
    required?: boolean;
    validation?: RegisterOptions;
    icon?: React.ReactNode;
    value?: string;
}
export interface DynamicFormProps {
    fields: IFormField[];
    onSubmit: (data: FieldValues) => void;
}
