# Dynamic Form Component

A highly customizable and easy-to-use dynamic form component built with React, TypeScript, and React Hook Form. This component allows you to generate a form dynamically based on an array of field configurations, making it suitable for various use cases. Compatible with Tailwind CSS And Bootstrap.

## Output

## Installation
To install the package, run:
```bash
npm install dynamic-form-component
```

## Peer Dependencies
Ensure you have the following peer dependencies installed:
* `react`
* `react-dom`
* `react-hook-form`
* `react-icons`

You can install them with:
```bash
npm install react react-dom react-hook-form react-icons
```

## Usage
### Importing The Component
```bash
import DynamicForm, { IFormField } from 'dynamic-form-component';
```
### Example Usage

`Important Note`: If you are using Tailwind Css, Update your `tailwind.config.js` file to:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/dynamic-form-component/**/*.js"
  ]
  ...Other configurations
}
``` 

Below is an example of how to use the `DynamicForm` component in your react project:
```js
import DynamicForm, { IFormField } from 'dynamic-form-component';
import { AiOutlineLock, AiOutlineMail, AiOutlineNumber, AiOutlineUser } from 'react-icons/ai';

const App = () => {
    const formFields: IFormField[] = [
        {
            id: 'name',
            errorId: 'nameErr',
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
            icon: <AiOutlineUser />
        },
        {
            id: 'email',
            errorId: 'emailErr',
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
            icon: <AiOutlineMail />
        },
        {
            id: 'age',
            errorId: 'ageError',
            label: 'Age',
            type: 'number',
            placeholder: 'Enter your age',
            validation: {
                min: {
                    value: 18,
                    message: 'You must be at least 18 years old',
                },
            },
            icon: <AiOutlineNumber />
        },
        {
            id: 'password',
            errorId: 'passwordErr',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your Password',
            validation: {
                required: 'Password is required',
            },
            icon: <AiOutlineLock />
        },
        {
            id: 'hobbies',
            errorId: 'subscriptionErr',
            label: 'Hobbies',
            type: 'checkbox',
            options: [
                { value: 'reading', label: "Reading" },
                { value: 'sports', label: "Sports" },
                { value: 'music', label: "Music" },
                { value: 'travelling', label: "Travelling" },
            ],
            validation: {},
        },
        {
            id: 'gender',
            errorId: 'genderErr',
            label: 'Gender',
            type: 'select',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
            validation: {
                required: 'Gender is required',
            },
        },
    ];

    // Form Submission Function
    const handleFormSubmit = (data: Record<string, any>) => {
        console.log('Form Data:', data);
    };

    // Return Based On Type Of CSS ('Tailwind CSS' || 'Bootstrap')
    return (
        <div>
            <h1>Dynamic Form Example</h1>
            {/* If You Are Using Bootstrap CSS Then */}
            <DynamicForm fields={formFields} onSubmit={handleFormSubmit} cssFramework="bootstrap" />
            {/* If You Are Using Tailwind CSS Then */}
            <DynamicForm fields={formFields} onSubmit={handleFormSubmit} cssFramework="tailwind" />
        </div>
    )
}

export default App
```

### Field Configuration
* id: Unique identifier for the field.
* errorId: Identifier for displaying error messages.
* label: Label for the form field.
* type: Type of the field (text, number, email, password, checkbox, select).
* options: (Optional) Array of options for select and checkbox fields.
* placeholder: (Optional) Placeholder text for the input.
* required: (Optional) Boolean indicating if the field is required.
* validation: (Optional) Validation rules based on React Hook Form's RegisterOptions.
* icon: (Optional) Icon component to display alongside the input.

### Form Submission
The `onSubmit` function passed to `DynamicForm` will receive the form data as a `Record<string, any>`. You can handle form submission by implementing your own logic in this function.
 
Example Form Data
```bash
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 25,
    "password": "password123",
    "hobbies": Array ["reading", "travelling"],
    "gender": "male"
  }
```

## Contributing
If you have any ideas, suggestions, or issues, feel free to open an issue or contribute with a pull request.