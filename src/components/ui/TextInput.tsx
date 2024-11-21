import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { InputProps } from '../../assets/interfaces'

const TextInput: React.FC<InputProps> = ({ field, register, error }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const inputType = field.type === 'password' && showPassword ? 'text' : field.type

    return (
        <>
            <div className={field.css?.wrapper}>
                {field.icon && <div className={field.css?.icon}>{field.icon}</div>}
                <input
                    id={field.id}
                    {...register(field.id, { ...field.validation })}
                    type={inputType}
                    placeholder={field.placeholder}
                    className={field.css?.input}
                    aria-describedby={error ? `${field.id}Err` : undefined}
                />
                {field.type === 'password' && (
                    <div
                        role='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setShowPassword((prev) => !prev)
                            }
                        }}
                        tabIndex={0}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                )}
            </div>
            {error && (
                <span className={field.error?.css} id={`${field.error?.id}`}>
                    {error}
                </span>
            )}
        </>
    )
}

export default TextInput
