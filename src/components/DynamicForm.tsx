import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { DynamicFormProps, IFormField } from '../assets/interfaces'

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, button }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' })

    const renderField = (field: IFormField) => {
        const error = errors[field.id]?.message as string

        const isPasswordField = field.type === 'password'
        const inputType = isPasswordField && showPassword ? 'text' : field.type

        return (
            <div id='input-wrapper'>
                <div id='input-container'>
                    {field.type === 'checkbox' && field.options ? (
                        <div className={field.css.wrapper}>
                            {field.options.map((option) => (
                                <div id='checkBox_innerDiv' key={option.value}>
                                    <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                                    <input
                                        id={`${field.id}-${option.value}`}
                                        {...register(field.id, { ...field.validation })}
                                        type={field.type}
                                        value={option.value}
                                        className={field.css.input}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : field.type === 'select' ? (
                        <select
                            {...register(field.id, { ...field.validation })}
                            id={field.id}
                            className={field.css.input}
                        >
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === 'textarea' ? (
                        <textarea
                            {...register(field.id, { ...field.validation })}
                            id={field.id}
                            placeholder={field.placeholder}
                            className={field.css.input}
                        ></textarea>
                    ) : field.type === 'radio' && field.options ? (
                        <div className={field.css.wrapper}>
                            {field.options.map((option) => (
                                <div key={option.value}>
                                    <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                                    <input
                                        id={`${field.id}-${option.value}`}
                                        {...register(field.id, { ...field.validation })}
                                        type='radio'
                                        value={option.value}
                                        className={field.css.input}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={field.css.wrapper}>
                            {field.icon && <div className={field.css.icon}>{field.icon}</div>}
                            <input
                                id={field.id}
                                {...register(field.id, { ...field.validation })}
                                type={inputType}
                                placeholder={field.placeholder}
                                className={field.css.input}
                            />
                            {isPasswordField && (
                                <div
                                    id='prop-icon'
                                    className={field.css.icon}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {error && (
                    <span className={field.error.css} id={field.error.id}>
                        {error}
                    </span>
                )}
            </div>
        )
    }

    return (
        <form className='main_form' onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <div key={field.id}>
                    <label className={field.css.label} htmlFor={field.id}>
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
