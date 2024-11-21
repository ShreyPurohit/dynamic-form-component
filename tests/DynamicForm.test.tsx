import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import 'jest-canvas-mock'
import * as React from 'react'
import { IFormField, ISubmitButtonProps } from '../src/assets/interfaces'
import DynamicForm from '../src/components/DynamicForm'

const formFields: IFormField[] = [
    {
        id: 'defaultname',
        error: { id: 'defaultnameErr', css: '' },
        label: 'Default Name',
        type: 'text',
        placeholder: 'Enter your Default name',
        required: true,
        validation: {
            required: 'Default Name is required',
            maxLength: {
                value: 20,
                message: 'Default Name must be less than 20 characters',
            },
            minLength: {
                value: 4,
                message: 'Default Name must be at least 4 characters',
            },
        },
        defaultValue: 'John Doe',
    },
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
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: 'Enter a valid email address',
            },
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
    },
    {
        id: 'age',
        error: { id: 'ageErr', css: '' },
        label: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
        validation: {
            required: 'Age is required',
            pattern: {
                value: /^[0-9]*$/,
                message: 'Please Input Only Numbers',
            },
            min: {
                value: 18,
                message: 'You must be at least 18 years old',
            },
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
    },
    {
        id: 'bio',
        error: { id: 'bioErr', css: '' },
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us about yourself',
        validation: {
            required: 'About is required',
            minLength: {
                value: 5,
                message: 'About is required',
            },
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
    },
]

const submitButton: ISubmitButtonProps = {
    id: 'buttonId',
    label: 'Submit',
    type: 'submit',
    css: 'btn btn-primary',
    disabled: false,
    onClick: () => {
        return console.log('Button Clicked')
    },
}

const mockSubmit = jest.fn()

describe('Dynamic Form Component', () => {
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

    test('renders fields and handles validation correctly', async () => {
        const inputs = [
            {
                placeholder: 'Enter your name',
                value: 'A very long name exceeding the limit',
                errorMsg: /name must be less than 20 characters/i,
            },
            { placeholder: 'Enter your email', value: 'invalid-email', errorMsg: /enter a valid email address/i },
            { placeholder: 'Enter your password', value: '123', errorMsg: /password must be at least 6 characters/i },
            { placeholder: 'Enter your age', value: '16', errorMsg: /you must be at least 18 years old/i },
        ]

        for (const { placeholder, value, errorMsg } of inputs) {
            const input = screen.getByPlaceholderText(placeholder)
            fireEvent.change(input, { target: { value } })
            fireEvent.blur(input)
            expect(await screen.findByText(errorMsg)).toBeInTheDocument()
        }
    })

    test('shows required error on blur for required fields', async () => {
        const requiredFields = ['Enter your email', 'Enter your password', 'Enter your age', 'Tell us about yourself']

        for (const placeholder of requiredFields) {
            const input = screen.getByPlaceholderText(placeholder) || screen.getByLabelText(placeholder)
            fireEvent.blur(input)
            expect(
                await screen.findByText(new RegExp(`${placeholder.split(' ')[2]} is required`, 'i')),
            ).toBeInTheDocument()
        }
    })

    test('handles valid submissions and calls onSubmit', async () => {
        fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your age'), { target: { value: 25 } })
        fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), { target: { value: 'I love coding.' } })
        fireEvent.click(screen.getByLabelText('Reading'))
        fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } })

        fireEvent.click(screen.getByText('Submit'))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    })

    test('error messages disappear with valid input', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email')

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.blur(emailInput)
        expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument()

        fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })
        fireEvent.blur(emailInput)

        await waitFor(() => {
            expect(screen.queryByText(/enter a valid email address/i)).not.toBeInTheDocument()
        })
    })

    test('checkbox group shows error when no checkbox is selected', async () => {
        fireEvent.click(screen.getByText('Submit'))
        expect(await screen.findByText(/at least one hobby must be selected/i)).toBeInTheDocument()
    })

    test('renders default values correctly', () => {
        const nameInput = screen.getByPlaceholderText('Enter your Default name')
        expect(nameInput).toHaveValue('John Doe')
        expect(screen.getByPlaceholderText('Enter your email')).toHaveValue('')
        expect(screen.getByPlaceholderText('Enter your password')).toHaveValue('')
    })

    test('submitting form with invalid email shows correct error', async () => {
        fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'invalid-email' } })
        fireEvent.click(screen.getByText('Submit'))

        expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument()
    })

    test('renders null for unsupported field type', () => {
        const unsupportedField: IFormField = {
            id: 'unsupportedField',
            label: 'Unsupported Field',
            type: 'unsupported',
        }
        render(
            <DynamicForm
                fields={[...formFields, unsupportedField]}
                onSubmit={mockSubmit}
                button={submitButton}
                layout={{ type: 'grid', css: 'grid-class' }}
            />,
        )
        expect(screen.queryByLabelText('Unsupported Field')).not.toBeInTheDocument()
    })

    test('button click calls onClick handler', async () => {
        const handleClick = jest.fn()
        const buttonWithClickHandler: ISubmitButtonProps = {
            ...submitButton,
            label: 'Button With Click',
            onClick: handleClick,
        }
        render(
            <DynamicForm
                fields={formFields}
                onSubmit={mockSubmit}
                button={buttonWithClickHandler}
                layout={{ type: 'grid', css: 'grid-class' }}
            />,
        )
        await waitFor(() => {
            fireEvent.click(screen.getByText('Button With Click'))
            expect(handleClick).toHaveBeenCalled()
        })
    })

    test('button is disabled when specified', async () => {
        const disabledButton: ISubmitButtonProps = { ...submitButton, disabled: true, label: 'Disabled Submit' }

        render(
            <DynamicForm
                fields={formFields}
                onSubmit={mockSubmit}
                button={disabledButton}
                layout={{ type: 'grid', css: 'grid-class' }}
            />,
        )
        await waitFor(() => {
            const submitButtonElement = screen.getByText('Disabled Submit')
            expect(submitButtonElement).toBeDisabled()
        })
    })
})
