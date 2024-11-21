import React from 'react'
import { useForm } from 'react-hook-form'
import { DynamicFormProps, IFormField } from '../assets/interfaces'
import CheckboxInput from './ui/Checkbox'
import RadioInput from './ui/Radio'
import SelectInput from './ui/Select'
import TextArea from './ui/TextArea'
import TextInput from './ui/TextInput'
import DatePicker from './ui/DatePicker'

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, button, layout }) => {
    const defaultValues = fields.reduce(
        (acc, field) => {
            if (field.defaultValue) {
                acc[field.id] = field.defaultValue
            }
            return acc
        },
        {} as Record<string, any>,
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all', defaultValues })

    const renderField = (field: IFormField) => {
        const error = errors[field.id]?.message as string

        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
                return <TextInput field={field} register={register} error={error} />
            case 'textarea':
                return <TextArea field={field} register={register} error={error} />
            case 'select':
                return <SelectInput field={field} register={register} error={error} />
            case 'checkbox':
                return <CheckboxInput field={field} register={register} error={error} />
            case 'date':
                return <DatePicker field={field} register={register} error={error} />
            case 'radio':
                return <RadioInput field={field} register={register} error={error} />
            default:
                return null
        }
    }

    return (
        <form className={`${layout?.type} ${layout?.css}`} onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <div key={field.id}>
                    <label className={field.css?.label} htmlFor={field.id}>
                        {field.label}
                    </label>
                    {renderField(field)}
                </div>
            ))}
            <button
                id={button.id}
                type={button.type}
                className={button.css}
                disabled={button.disabled}
                onClick={button.onClick}
            >
                {button.label}
            </button>
        </form>
    )
}

export default DynamicForm
