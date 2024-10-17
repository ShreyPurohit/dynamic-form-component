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
                minLength: {
                    value: 4,
                    message: 'Name must be at least 4 characters',
                },
            },
            icon: <AiOutlineUser />,
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
                icon: 'icon-class',
            },
            defaultValue: 'John Doe', // Default value added
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
            id: 'bio',
            error: { id: 'bioErr', css: '' },
            label: 'Bio',
            type: 'textarea',
            placeholder: 'Tell us about yourself',
            validation: {
                required: 'Bio is required',
                minLength: {
                    value: 5,
                    message: 'Bio is required',
                },
            },
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
            },
        },
        {
            id: 'defaultCheck',
            error: { id: 'defaultCheckErr', css: '' },
            label: 'Default Checked Checkbox',
            type: 'checkbox',
            options: [
                { value: 'checkOpt1', label: 'Checkbox Option 1', defaultChecked: true },
                { value: 'checkOpt2', label: 'Checkbox Option 2' },
            ],
            placeholder: 'Tell us about yourself',
            validation: {
                required: 'At least one checkbox must be selected',
            },
            css: {
                wrapper: 'input-wrapper-class',
                label: 'label-class',
                input: 'input-class',
            },
        },
        {
            id: 'defaultRadio',
            error: { id: 'defaultRadioErr', css: '' },
            label: 'Default Radio',
            type: 'radio',
            options: [
                { value: 'radOpt1', label: 'Radio Option 1', defaultChecked: true },
                { value: 'radOpt2', label: 'Radio Option 2' },
            ],
            validation: {
                required: 'Atleast one Option is required',
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
        css: 'btn btn-primary',
        disabled: false,
        onClick: () => {
            console.log('Form Button Clicked')
        },
    }

    const mockSubmit = jest.fn()

    beforeEach(() => {
        render(
            <DynamicForm
                fields={formFields}
                onSubmit={mockSubmit}
                button={submitButton}
                layout={{ type: 'grid', css: 'grid-class' }}
            />,
        )
    })

    test('renders text field and handles validation correctly', async () => {
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
        const emailInput = screen.getByPlaceholderText('Enter your email')
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.blur(emailInput)

        const emailError = await screen.findByText(/enter a valid email address/i)
        expect(emailError).toBeInTheDocument()
    })

    test('renders password field and shows error if password is too short', async () => {
        const passwordInput = screen.getByPlaceholderText('Enter your password')
        fireEvent.change(passwordInput, { target: { value: '123' } })
        fireEvent.blur(passwordInput)

        const passwordError = await screen.findByText(/password must be at least 6 characters/i)
        expect(passwordError).toBeInTheDocument()
    })

    test('renders number field and checks validation for minimum age', async () => {
        const ageInput = screen.getByPlaceholderText('Enter your age')
        fireEvent.change(ageInput, { target: { value: 16 } })
        fireEvent.blur(ageInput)

        const ageError = await screen.findByText(/you must be at least 18 years old/i)
        expect(ageError).toBeInTheDocument()
    })

    test('renders select field and requires value', async () => {
        const selectInput = screen.getByLabelText('Gender')
        fireEvent.blur(selectInput)

        const genderError = await screen.findByText(/gender is required/i)
        expect(genderError).toBeInTheDocument()
    })

    test('renders checkbox field and requires at least one option', async () => {
        const checkboxInput = screen.getByLabelText('Reading')
        fireEvent.click(checkboxInput)

        expect(checkboxInput).toBeChecked()
    })

    test('renders textarea field and handles validation', async () => {
        const bioInput = screen.getByPlaceholderText('Tell us about yourself')
        fireEvent.change(bioInput, { target: { value: '' } })
        fireEvent.blur(bioInput)

        const bioError = await screen.findByText(/bio is required/i)
        expect(bioError).toBeInTheDocument()
    })

    test('renders default checked checkbox and allows unchecking', async () => {
        const checkboxInput = screen.getByLabelText('Checkbox Option 1')

        expect(checkboxInput).toBeChecked()

        fireEvent.click(checkboxInput)
        expect(checkboxInput).not.toBeChecked()

        fireEvent.click(checkboxInput)
        expect(checkboxInput).toBeChecked()
    })

    test('renders default radio button and allows selection', async () => {
        const defaultRadio = screen.getByLabelText('Radio Option 1')
        const secondRadio = screen.getByLabelText('Radio Option 2')

        expect(defaultRadio).toBeChecked()
        expect(secondRadio).not.toBeChecked()

        fireEvent.click(secondRadio)
        expect(secondRadio).toBeChecked()
        expect(defaultRadio).not.toBeChecked()
    })

    test('calls onSubmit when all form fields are valid', async () => {
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

    test('name field accepts maximum length input', async () => {
        const nameInput = screen.getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, { target: { value: 'Johnathan Smith' } })
        fireEvent.blur(nameInput)
        expect(screen.queryByText(/name must be less than 20 characters/i)).not.toBeInTheDocument()
    })

    test('password field shows error for exactly 6 characters', async () => {
        const passwordInput = screen.getByPlaceholderText('Enter your password')
        fireEvent.change(passwordInput, { target: { value: '123456' } })
        fireEvent.blur(passwordInput)
        expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument()
    })

    test('renders age field and shows validation error for age below 18', async () => {
        const ageInput = screen.getByPlaceholderText('Enter your age')

        fireEvent.change(ageInput, { target: { value: '16' } })
        fireEvent.blur(ageInput)

        const minAgeError = await screen.findByText(/you must be at least 18 years old/i)
        expect(minAgeError).toBeInTheDocument()
    })

    test('checkbox field requires at least one selection', async () => {
        const hobbiesCheckbox1 = screen.getByLabelText('Reading')
        const hobbiesCheckbox2 = screen.getByLabelText('Music')
        fireEvent.click(hobbiesCheckbox1)
        fireEvent.click(hobbiesCheckbox2)
        fireEvent.click(hobbiesCheckbox1) // uncheck
        fireEvent.click(hobbiesCheckbox2) // uncheck

        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)

        const hobbiesError = await screen.findByText(/at least one hobby must be selected/i)
        expect(hobbiesError).toBeInTheDocument()
    })

    test('gender selection requires a valid option', async () => {
        const selectInput = screen.getByLabelText('Gender')
        fireEvent.change(selectInput, { target: { value: '' } }) // select default
        fireEvent.blur(selectInput)

        const genderError = await screen.findByText(/gender is required/i)
        expect(genderError).toBeInTheDocument()
    })

    test('bio field shows error for whitespace input', async () => {
        const bioInput = screen.getByPlaceholderText('Tell us about yourself')
        fireEvent.change(bioInput, { target: { value: '   ' } })
        fireEvent.blur(bioInput)

        const bioError = await screen.findByText(/bio is required/i)
        expect(bioError).toBeInTheDocument()
    })
})
