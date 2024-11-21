import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-canvas-mock'
import React from 'react'
import { IFormField } from '../src/assets/interfaces'
import CheckboxInput from '../src/components/ui/Checkbox'

describe('CheckboxInput Component', () => {
    const mockRegister = jest.fn()

    const field: IFormField = {
        id: 'hobbies',
        label: 'Hobbies',
        type: 'checkbox',
        options: [
            { value: 'reading', label: 'Reading' },
            { value: 'music', label: 'Music' },
        ],
        validation: {
            required: 'At least one hobby must be selected',
        },
    }

    const defaultCheckBox: IFormField = {
        id: 'defaultCheck',
        error: { id: 'defaultCheckErr', css: '' },
        label: 'Default Checked Checkbox',
        type: 'checkbox',
        options: [
            { value: 'checkOpt1', label: 'Checkbox Option 1', defaultChecked: true },
            { value: 'checkOpt2', label: 'Checkbox Option 2' },
        ],
        validation: {
            required: 'At least one checkbox must be selected',
        },
        css: {
            wrapper: 'input-wrapper-class',
            label: 'label-class',
            input: 'input-class',
        },
    }

    beforeEach(() => {
        render(<CheckboxInput field={field} register={mockRegister} />)
    })

    test('renders checkboxes correctly when options are provided', () => {
        const readingCheckbox = screen.getByLabelText('Reading')
        const musicCheckbox = screen.getByLabelText('Music')

        expect(readingCheckbox).toBeInTheDocument()
        expect(musicCheckbox).toBeInTheDocument()
    })

    test('handles checkbox selection and deselection', async () => {
        const readingCheckbox = screen.getByLabelText('Reading')
        const musicCheckbox = screen.getByLabelText('Music')

        // Select and deselect Reading
        fireEvent.click(readingCheckbox)
        expect(readingCheckbox).toBeChecked()
        fireEvent.click(readingCheckbox)
        expect(readingCheckbox).not.toBeChecked()

        // Select Music
        fireEvent.click(musicCheckbox)
        expect(musicCheckbox).toBeChecked()
    })

    test('handles default checked state correctly', async () => {
        render(<CheckboxInput field={defaultCheckBox} register={mockRegister} />)

        const checkOpt1 = screen.getByLabelText('Checkbox Option 1')
        const checkOpt2 = screen.getByLabelText('Checkbox Option 2')

        // Checkbox Option 1 should be checked by default
        expect(checkOpt1).toBeChecked()
        expect(checkOpt2).not.toBeChecked()

        // Toggle Checkbox Option 1
        fireEvent.click(checkOpt1)
        expect(checkOpt1).not.toBeChecked()
        fireEvent.click(checkOpt1)
        expect(checkOpt1).toBeChecked()
    })

    test('handles multiple selections correctly', async () => {
        const readingCheckbox = screen.getByLabelText('Reading')
        const musicCheckbox = screen.getByLabelText('Music')

        // Select both checkboxes and deselect one
        fireEvent.click(readingCheckbox)
        fireEvent.click(musicCheckbox)
        expect(readingCheckbox).toBeChecked()
        expect(musicCheckbox).toBeChecked()

        fireEvent.click(musicCheckbox)
        expect(musicCheckbox).not.toBeChecked()
        expect(readingCheckbox).toBeChecked()
    })
})
