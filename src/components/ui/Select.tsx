import React from 'react'
import { InputProps } from '../../assets/interfaces'

const SelectInput: React.FC<InputProps> = ({ field, register, error }) => (
    <div>
        <select {...register(field.id, { ...field.validation })} id={field.id} className={field.css?.input}>
            {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && (
            <span className={field.error?.css} id={field.error?.id}>
                {error}
            </span>
        )}
    </div>
)

export default SelectInput
