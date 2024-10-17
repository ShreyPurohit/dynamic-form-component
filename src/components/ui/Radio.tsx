import React from 'react'
import { InputProps } from '../../assets/interfaces'

const RadioInput: React.FC<InputProps> = ({ field, register, error }) => (
    <div className={field.css?.wrapper}>
        {field.options?.map((option) => (
            <div key={option.value}>
                <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                <input
                    id={`${field.id}-${option.value}`}
                    {...register(field.id, { ...field.validation })}
                    type='radio'
                    defaultChecked={option.defaultChecked || false}
                    value={option.value}
                    className={field.css?.input}
                />
            </div>
        ))}
        {error && (
            <span className={field.error?.css} id={field.error?.id}>
                {error}
            </span>
        )}
    </div>
)

export default RadioInput
