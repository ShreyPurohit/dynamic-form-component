import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-canvas-mock'
import React from 'react'
import { IFormField } from '../src/assets/interfaces'
import RadioInput from '../src/components/ui/Radio'

describe('RadioInput Component', () => {
    const mockRegister = jest.fn()

    const field: IFormField = {
        id: 'gender',
        error: { id: 'genderErr', css: '' },
        label: 'Gender',
        type: 'radio',
        options: [
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
    }

    const defaultSelectedRadio: IFormField = {
        id: 'defaultRadio',
        error: { id: 'defaultRadioErr', css: '' },
        label: 'Default Radio',
        type: 'radio',
        options: [
            { value: 'radOpt1', label: 'Radio Option 1', defaultChecked: true },
            { value: 'radOpt2', label: 'Radio Option 2' },
        ],
        validation: {
            required: 'At least one option is required',
        },
        css: {
            wrapper: 'input-wrapper-class',
            label: 'label-class',
            input: 'input-class',
        },
    }

    beforeEach(() => {
        render(<RadioInput field={field} register={mockRegister} />)
    })

    test('renders radio buttons and allows selection', () => {
        const maleRadio = screen.getByLabelText('Male')
        const femaleRadio = screen.getByLabelText('Female')

        expect(maleRadio).toBeInTheDocument()
        expect(femaleRadio).toBeInTheDocument()
        expect(maleRadio).not.toBeChecked()
        expect(femaleRadio).not.toBeChecked()

        fireEvent.click(femaleRadio)
        expect(femaleRadio).toBeChecked()
        expect(maleRadio).not.toBeChecked()
    })

    test('handles radio button selection correctly', () => {
        const maleRadio = screen.getByLabelText('Male')
        const femaleRadio = screen.getByLabelText('Female')

        fireEvent.click(femaleRadio)
        expect(femaleRadio).toBeChecked()
        expect(maleRadio).not.toBeChecked()
    })

    test('renders options correctly', () => {
        const maleRadio = screen.getByLabelText('Male')
        const femaleRadio = screen.getByLabelText('Female')

        expect(maleRadio).toBeInTheDocument()
        expect(femaleRadio).toBeInTheDocument()
    })

    test('allows only one radio button to be selected at a time', () => {
        render(<RadioInput field={defaultSelectedRadio} register={mockRegister} />)

        const radioOption1 = screen.getByLabelText('Radio Option 1')
        const radioOption2 = screen.getByLabelText('Radio Option 2')

        expect(radioOption1).toBeChecked()
        expect(radioOption2).not.toBeChecked()

        fireEvent.click(radioOption2)
        expect(radioOption2).toBeChecked()
        expect(radioOption1).not.toBeChecked()

        fireEvent.click(radioOption1)
        expect(radioOption1).toBeChecked()
        expect(radioOption2).not.toBeChecked()
    })

    test('default selected option is checked', () => {
        render(<RadioInput field={defaultSelectedRadio} register={mockRegister} />)
        const radioOption1 = screen.getByLabelText('Radio Option 1')
        const radioOption2 = screen.getByLabelText('Radio Option 2')

        expect(radioOption1).toBeChecked()
        expect(radioOption2).not.toBeChecked()
    })

    test('displays error message when no option is selected', () => {
        // Simulate the condition of no selection and check error display
        render(<RadioInput field={field} register={mockRegister} error='Gender is required' />)

        const errorElement = screen.getByText(/Gender is required/i)
        expect(errorElement).toBeInTheDocument()
    })

    test('does not display error message when an option is selected', () => {
        fireEvent.click(screen.getByLabelText('Male'))

        const errorElement = screen.queryByText(/Gender is required/i)
        expect(errorElement).not.toBeInTheDocument()
    })
})
