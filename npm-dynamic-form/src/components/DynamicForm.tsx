import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { DynamicFormProps, IFormField } from '../assets/interfaces';

const CustomizedDynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, cssFramework }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });

    const renderField = (field: IFormField) => {
        const error = errors[field.id]?.message as string;

        const isPasswordField = field.type === 'password';
        const inputType = isPasswordField && showPassword ? 'text' : field.type;

        return (
            <div id='input-wrapper' className={cssFramework === 'bootstrap' ? 'mb-3 w-1' : ''}>
                <div id='input-container' className={cssFramework === 'bootstrap' ? 'input-group' : ''}>
                    {
                        field.type === 'checkbox' && field.options ? (
                            <div className={cssFramework === 'bootstrap' ? 'row' : 'grid grid-cols-2 gap-4'}>
                                {field.options.map(option => (
                                    <div key={option.value}
                                        className={cssFramework === 'bootstrap' ? 'col-6 d-flex align-items-center' : 'flex gap-1 justify-center'}>
                                        <label htmlFor={`${field.id}-${option.value}`} className={cssFramework === 'bootstrap' ? 'form-check-label ms-2' : 'ml-2'}>{option.label} :</label>
                                        <input
                                            id={`${field.id}-${option.value}`}
                                            {...register(field.id, { ...field.validation })}
                                            type={field.type}
                                            value={option.value}
                                            className={cssFramework === 'bootstrap' ? 'form-check-input ms-2' : ''}
                                        />
                                    </div>
                                ))}
                            </div >
                        ) : field.type === 'select' ? (
                            <select
                                {...register(field.id, { ...field.validation })}
                                id={field.id}
                                className={cssFramework === 'bootstrap' ? 'form-select' : "border rounded w-full sm:py-2 sm:px-3 py-1 px-3 text-stone-600 leading-tight focus:outline-none text-sm sm:text-base"}
                            >
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className={cssFramework === 'bootstrap' ? 'input-group' : 'flex items-center p-1 border'}>
                                {field.icon && <div className={cssFramework === 'bootstrap' ? 'input-group-text' : 'ml-2'}>{field.icon}</div>}
                                <input
                                    id={field.id}
                                    {...register(field.id, { ...field.validation })}
                                    type={inputType}
                                    placeholder={field.placeholder}
                                    className={cssFramework === 'bootstrap' ? `form-control ${error ? 'is-invalid' : ''}` : 'rounded w-full sm:py-2 sm:px-3 py-1 px-2 text-stone-600 leading-tight focus:outline-none text-sm sm:text-base'}
                                />
                                {isPasswordField && (
                                    <div
                                        id="prop-icon"
                                        className={cssFramework === 'bootstrap' ? 'input-group-text' : 'hover:cursor-pointer mr-3'}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
                {error && <div className={cssFramework === 'bootstrap' ? 'text-danger' : 'text-orange-500 italic text-sm sm:text-base'} id={field.errorId}>{error}</div>}
            </div >
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cssFramework === 'bootstrap' ? 'card p-4 w-50 m-auto' : 'flex flex-col md:w-1/2 m-auto p-5 gap-5 md:mt-5 md:border border-slate-400 rounded-lg'}>
            {fields.map((field) => (
                <div key={field.id} className={cssFramework === 'bootstrap' ? 'mb-3' : ''}>
                    <label htmlFor={field.id} className={cssFramework === 'bootstrap' ? "form-label" : "block text-gray-700 sm:text-lg font-bold mb-2"}>{field.label}</label>
                    {renderField(field)}
                </div>
            ))}
            <button
                type='submit'
                disabled={Object.keys(errors).length ? true : false}
                className={cssFramework === 'bootstrap' ? 'btn btn-primary w-100 mt-3' : 'px-4 py-2 bg-slate-400 hover:bg-slate-600 hover:transition hover:text-white rounded-lg disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:text-white'}
            >
                Submit
            </button>
        </form >
    );
};

export default CustomizedDynamicForm;