import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-canvas-mock'
import * as React from 'react'
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { IFormField, ISubmitButtonProps } from '../src/assets/interfaces'
import DynamicForm from '../src/components/DynamicForm'

describe('Dynamic Form Component', () => {
    const formFields: IFormField[] = [
        {
            id: 'name',
            error: { id: 'nameErr', css: '' },
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name',
            required: true,
            validation: {
                required: 'Name is required',
                maxLength: {
                    value: 20,
                    message: 'Name must be less than 20 characters',
                },
            },
            icon: <AiOutlineUser />,
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
                icon: 'icon-class',
            },
        },
        {
            id: 'email',
            error: { id: 'emailErr', css: '' },
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            validation: {
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Enter a valid email address',
                },
            },
            icon: <AiOutlineMail />,
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
                icon: 'icon-class',
            },
        },
        {
            id: 'password',
            error: { id: 'passwordErr', css: '' },
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            validation: {
                required: 'Password is required',
                minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                },
            },
            icon: <AiOutlineLock />,
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
                icon: 'icon-class',
            },
        },
        {
            id: 'age',
            error: { id: 'ageErr', css: '' },
            label: 'Age',
            type: 'number',
            placeholder: 'Enter your age',
            validation: {
                min: {
                    value: 18,
                    message: 'You must be at least 18 years old',
                },
            },
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
            },
        },
        {
            id: 'gender',
            error: { id: 'genderErr', css: '' },
            label: 'Gender',
            type: 'select',
            options: [
                { value: '', label: 'Select Gender' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
            ],
            validation: {
                required: 'Gender is required',
            },
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
            },
        },
        {
            id: 'hobbies',
            error: { id: 'hobbiesErr', css: '' },
            label: 'Hobbies',
            type: 'checkbox',
            options: [
                { value: 'reading', label: 'Reading' },
                { value: 'music', label: 'Music' },
            ],
            validation: {
                required: 'At least one hobby must be selected',
            },
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
            },
        },
        {
            id: 'bio',
            error: { id: 'bioErr', css: '' },
            label: 'Bio',
            type: 'textarea',
            placeholder: 'Tell us about yourself',
            validation: {
                required: 'Bio is required',
            },
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
            },
        },
    ]

    const submitButton: ISubmitButtonProps = {
        id: 'buttonId',
        label: 'Submit',
        type: 'submit',
        css: 'btn btn-primary', //Css For Your Button
        disabled: false,
        onClick: () => {
            console.log('Form Button Clicked')
        },
    }

    const mockSubmit = jest.fn()

    test('renders text field and handles validation correctly', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const nameInput = screen.getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, { target: { value: 'John' } })
        fireEvent.blur(nameInput)

        expect(nameInput).toBeInTheDocument()
        expect(nameInput).toHaveValue('John')

        fireEvent.change(nameInput, { target: { value: 'A very long name exceeding the limit' } })
        const nameError = await screen.findByText(/name must be less than 20 characters/i)
        expect(nameError).toBeInTheDocument()
    })

    test('renders email field and shows validation error for invalid email', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const emailInput = screen.getByPlaceholderText('Enter your email')
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.blur(emailInput)

        const emailError = await screen.findByText(/enter a valid email address/i)
        expect(emailError).toBeInTheDocument()
    })

    test('renders password field and shows error if password is too short', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const passwordInput = screen.getByPlaceholderText('Enter your password')
        fireEvent.change(passwordInput, { target: { value: '123' } })
        fireEvent.blur(passwordInput)

        const passwordError = await screen.findByText(/password must be at least 6 characters/i)
        expect(passwordError).toBeInTheDocument()
    })

    test('renders number field and checks validation for minimum age', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const ageInput = screen.getByPlaceholderText('Enter your age')
        fireEvent.change(ageInput, { target: { value: 16 } })
        fireEvent.blur(ageInput)

        const ageError = await screen.findByText(/you must be at least 18 years old/i)
        expect(ageError).toBeInTheDocument()
    })

    test('renders select field and requires value', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const selectInput = screen.getByLabelText('Gender')
        fireEvent.blur(selectInput)

        const genderError = await screen.findByText(/gender is required/i)
        expect(genderError).toBeInTheDocument()
    })

    test('renders checkbox field and requires at least one option', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const checkboxInput = screen.getByLabelText('Reading')
        fireEvent.click(checkboxInput)

        expect(checkboxInput).toBeChecked()
    })

    test('renders textarea field and handles validation', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        const bioInput = screen.getByPlaceholderText('Tell us about yourself')
        fireEvent.change(bioInput, { target: { value: '' } })
        fireEvent.blur(bioInput)

        const bioError = await screen.findByText(/bio is required/i)
        expect(bioError).toBeInTheDocument()
    })

    test('calls onSubmit when all form fields are valid', async () => {
        render(<DynamicForm fields={formFields} onSubmit={mockSubmit} button={submitButton} />)

        fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your age'), { target: { value: 25 } })
        fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), { target: { value: 'I love coding.' } })
        fireEvent.click(screen.getByLabelText('Reading'))
        fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } })

        const button = screen.getByText('Submit')
        fireEvent.click(button)
        await screen.findByText('Submit')
        expect(mockSubmit).toHaveBeenCalled()
    })
})
