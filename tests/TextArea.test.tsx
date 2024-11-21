import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IFormField } from '../src/assets/interfaces'
import TextArea from '../src/components/ui/TextArea'

describe('TextArea Component', () => {
    const mockRegister = jest.fn()
    const field: IFormField = {
        id: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us about yourself',
        validation: {
            required: 'Bio is required',
        },
        css: {
            input: 'input-class',
        },
    }

    beforeEach(() => {
        render(<TextArea field={field} register={mockRegister} error={undefined} />)
    })

    test('renders textarea with placeholder', () => {
        const textArea = screen.getByPlaceholderText('Tell us about yourself')
        expect(textArea).toBeInTheDocument()
    })

    test('does not show validation error when textarea has value', async () => {
        const textArea = screen.getByPlaceholderText('Tell us about yourself')
        fireEvent.change(textArea, { target: { value: 'This is my bio.' } })
        fireEvent.blur(textArea)

        await waitFor(() => {
            const errorMessage = screen.queryByText(/bio is required/i)
            expect(errorMessage).not.toBeInTheDocument()
        })
    })

    test('calls register function with correct parameters', () => {
        expect(mockRegister).toHaveBeenCalledWith('bio', { ...field.validation })
    })
})
