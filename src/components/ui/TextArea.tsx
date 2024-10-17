import React from 'react'
import { InputProps } from '../../assets/interfaces'

const TextArea: React.FC<InputProps> = ({ field, register, error }) => (
    <div>
        <textarea
            {...register(field.id, { ...field.validation })}
            id={field.id}
            placeholder={field.placeholder}
            className={field.css?.input}
        />
        {error && (
            <span className={field.error?.css} id={field.error?.id}>
                {error}
            </span>
        )}
    </div>
)

export default TextArea
