import React, { useState } from 'react'
import { InputProps } from '../../assets/interfaces'

const RadioInput: React.FC<InputProps> = ({ field, register, error }) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        field.options?.find((option) => option.defaultChecked)?.value,
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value)
    }

    return (
        <div className={field.css?.wrapper}>
            {field.options?.map((option) => (
                <div key={option.value}>
                    <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                    <input
                        id={`${field.id}-${option.value}`}
                        {...register(field.id, { ...field.validation })}
                        type='radio'
                        value={option.value}
                        checked={selectedValue === option.value ? true : false}
                        onChange={handleChange}
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
}

export default RadioInput
