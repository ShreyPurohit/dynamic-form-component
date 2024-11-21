import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-canvas-mock'
import React from 'react'
import { IFormField } from '../src/assets/interfaces'
import SelectInput from '../src/components/ui/Select'

describe('SelectInput Component', () => {
    const mockRegister = jest.fn()

    const field: IFormField = {
        id: 'gender',
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
        error: {
            id: 'genderErr',
            css: 'error-class',
        },
        css: {
            input: 'input-class',
        },
    }

    beforeEach(() => {
        render(<SelectInput field={field} register={mockRegister} />)
    })

    test('renders select field with options', () => {
        const select = screen.getByRole('combobox') // More specific selector for select
        const options = screen.getAllByRole('option')

        expect(select).toBeInTheDocument()
        expect(options).toHaveLength(3)
        expect(options[0]).toHaveTextContent('Select Gender')
        expect(options[1]).toHaveTextContent('Male')
        expect(options[2]).toHaveTextContent('Female')
    })

    test('handles selection change and default option', () => {
        const select = screen.getByRole('combobox')

        // Check default selection
        expect(select).toHaveValue('')

        // Change selection to 'Male'
        fireEvent.change(select, { target: { value: 'male' } })
        expect(select).toHaveValue('male')

        // Change selection to 'Female'
        fireEvent.change(select, { target: { value: 'female' } })
        expect(select).toHaveValue('female')
    })
})
