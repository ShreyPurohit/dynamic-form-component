import React, { useState } from 'react'
import { InputProps } from '../../assets/interfaces'

const DatePicker: React.FC<InputProps> = ({ field, register, error }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<string>(field.value || field.defaultValue || '')

    const handleDateChange = (date: string) => {
        setSelectedDate(date)
        setIsCalendarOpen(false)
    }

    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB') : ''

    return (
        <>
            <div className={field.css?.wrapper}>
                {field.icon && <div className={field.css?.icon}>{field.icon}</div>}
                <input
                    id={field.id}
                    {...register(field.id, { ...field.validation })}
                    value={formattedDate}
                    placeholder={field.placeholder}
                    readOnly
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                    className={field.css?.input}
                />
                {isCalendarOpen && (
                    <div className='calendar-popup'>
                        {Array.from({ length: 31 }).map((_, index) => {
                            const date = index + 1
                            return (
                                <div
                                    key={date}
                                    onClick={() => handleDateChange(`2023-10-${date < 10 ? '0' + date : date}`)}
                                >
                                    {date < 10 ? '0' + date : date}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            {error && (
                <span className={field.error?.css} id={field.error?.id}>
                    {error}
                </span>
            )}
        </>
    )
}

export default DatePicker
