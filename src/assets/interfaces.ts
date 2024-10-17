import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

type IFieldType = 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'select' | 'textarea' | 'radio'

export interface IFormField {
    id: string
    label: string
    value?: string
    type: IFieldType
    required?: boolean
    placeholder?: string
    defaultValue?: string
    icon?: React.ReactNode
    validation?: RegisterOptions
    error?: { id?: string; css?: string }
    options?: { value: string; label: string; defaultChecked?: boolean }[]
    css?: { wrapper?: string; label?: string; input?: string; icon?: string }
}

export interface ISubmitButtonProps {
    id: string
    css?: string
    label: string
    disabled?: boolean
    onClick?: () => void
    type: 'button' | 'submit' | 'reset'
}

type LayoutType = { type: 'grid'; css: string } | { type: 'flex'; css: string }

export interface DynamicFormProps {
    layout?: LayoutType
    fields: IFormField[]
    button: ISubmitButtonProps
    onSubmit: (data: FieldValues) => void
}

export interface InputProps {
    field: IFormField
    register: UseFormRegister<any>
    error?: string
}
