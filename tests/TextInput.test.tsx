import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-canvas-mock'
import React from 'react'
import { IFormField } from '../src/assets/interfaces'
import TextInput from '../src/components/ui/TextInput'

describe('TextInput Component', () => {
    const mockRegister = jest.fn()

    const passwordField: IFormField = {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        validation: {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
        },
        css: {
            wrapper: 'input-wrapper-class',
            input: 'input-class',
            icon: 'icon-class',
        },
        error: {
            id: 'passwordErr',
            css: 'error-class',
        },
    }

    const textField: IFormField = {
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
            minLength: {
                value: 4,
                message: 'Name must be at least 4 characters',
            },
        },
    }

    const numberField: IFormField = {
        id: 'age',
        error: { id: 'ageErr', css: '' },
        label: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
        validation: {
            pattern: {
                value: /^[0-9]*$/,
                message: 'Please Input Only Numbers',
            },
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
    }

    const emailField: IFormField = {
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
        css: {
            wrapper: 'input-wrapper-class',
            label: 'label-class',
            input: 'input-class',
            icon: 'icon-class',
        },
    }

    test('renders password input field and shows placeholder', () => {
        render(<TextInput field={passwordField} register={mockRegister} />)
        const input = screen.getByPlaceholderText('Enter your password')
        expect(input).toBeInTheDocument()
    })

    test('renders text input field and handles input correctly', () => {
        render(<TextInput field={textField} register={mockRegister} />)
        const textInput = screen.getByPlaceholderText('Enter your name')
        fireEvent.change(textInput, { target: { value: 'Valid Name' } })
        expect(textInput).toHaveValue('Valid Name')
    })

    test('does not show error for maximum length input', async () => {
        render(<TextInput field={textField} register={mockRegister} />)
        const nameInput = screen.getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, { target: { value: 'Johnathan Smith' } })
        fireEvent.blur(nameInput)
        expect(screen.queryByText(/name must be less than 20 characters/i)).not.toBeInTheDocument()
    })

    test('renders number input field and handles input correctly', async () => {
        render(<TextInput field={numberField} register={mockRegister} />)
        const numberInput = screen.getByPlaceholderText('Enter your age')
        fireEvent.change(numberInput, { target: { value: '25' } })
        expect(numberInput).toHaveValue(25)
    })

    test('renders email input field and handles input correctly', () => {
        render(<TextInput field={emailField} register={mockRegister} />)
        const emailInput = screen.getByPlaceholderText('Enter your email')
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        expect(emailInput).toHaveValue('test@example.com')
    })

    test('shows password as text when toggle is clicked', () => {
        render(<TextInput field={passwordField} register={mockRegister} />)
        const toggleButton = screen.getByRole('button', { name: /show password/i })
        const input = screen.getByPlaceholderText('Enter your password')

        expect(input).toHaveAttribute('type', 'password')
        fireEvent.click(toggleButton)
        expect(input).toHaveAttribute('type', 'text')
        fireEvent.click(toggleButton)
        expect(input).toHaveAttribute('type', 'password')
    })

    test('displays error message when error prop is provided for password', () => {
        const errorMessage = 'Password is required'
        render(<TextInput field={passwordField} register={mockRegister} error={errorMessage} />)
        const errorText = screen.getByText(errorMessage)
        expect(errorText).toBeInTheDocument()
        expect(errorText).toHaveAttribute('id', 'passwordErr')
    })

    test('displays error message when error prop is provided', () => {
        render(<TextInput field={passwordField} register={mockRegister} error='Password is required' />)
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })

    test('shows error for invalid email format', async () => {
        render(<TextInput field={emailField} register={mockRegister} />)
        const emailInput = screen.getByPlaceholderText('Enter your email')

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.blur(emailInput)

        expect(emailInput).toHaveValue('invalid-email')
    })

    test('shows error for age under minimum requirement', async () => {
        render(<TextInput field={numberField} register={mockRegister} />)
        const ageInput = screen.getByPlaceholderText('Enter your age')

        fireEvent.change(ageInput, { target: { value: '17' } })
        fireEvent.blur(ageInput)

        expect(ageInput).toHaveValue(17)
    })
})
