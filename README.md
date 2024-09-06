# Customized Dynamic Form Component

This package provides a fully customizable dynamic form component for React, built to support various input types and customizable layouts, including support for both Tailwind and Bootstrap. Users can pass an array of form fields and control various form behaviors, CSS classes, validation rules, and form submission handlers.

## Output
![Dynamic Form Output](https://github.com/user-attachments/assets/c7dee211-25c4-4d89-bb80-f06a0618a773)

## Installation
To install the package, run:
```bash
npm install dynamic-form-component
```

## Peer Dependencies
Ensure you have the following peer dependencies installed:
* `react-hook-form`
* `react-icons`

You can install them with:
```bash
npm install react react-dom react-hook-form react-icons
```

## Features
* __Flexible Input Types:__ Supports `text`, `number`, `email`, `password`, `checkbox`, `radio`, `select`, and `textarea` fields.
* __Customizable Layouts:__ Customize CSS classes for each field component (wrapper, label, input, icon, error).
* __Icons:__ Supports React icons or any custom icons.
* __Validation:__ Leverage React Hook Form’s validation for comprehensive form validation rules.
* __Custom Buttons:__ Fully customizable submit or action buttons.
* __CSS Framework Support:__ Compatible with both `Tailwind CSS` and `Bootstrap`

## Usage
### Importing The Component
```bash
import DynamicForm, { IFormField, ISubmitButtonProps } from 'dynamic-form-component';
```
### Example Usage

Below is an example of how to use the `DynamicForm` component in your react project:
```js
import { AiOutlineUser } from 'react-icons/ai';
import DynamicForm, { IFormField, ISubmitButtonProps } from 'your-dynamic-form-package';

function App() {
    const formFields: IFormField[] = [
        {
            id: 'name',
            label: 'Name',
            error: {
                id: "nameErr",
                css: "text-danger" // Add Bootstrap Or Tailwind CSS here
            },
            type: 'text',
            placeholder: 'Enter your name',
            validation: {
                required: 'Name is required',
                maxLength: {
                    value: 20,
                    message: 'Name must be less than 20 characters',
                },
            },
            icon: <AiOutlineUser />,
            css: { // Add Bootstrap Or Tailwind CSS here
                wrapper: 'flex items-center p-1 border',
                label: 'block text-gray-700 text-lg font-bold mb-2',
                input: 'rounded w-full py-2 px-3 text-gray-700',
                icon: 'ml-2',
                error: 'text-red-500 text-sm',
            },
        },
        // Add more form fields here
    ];

    const button: ISubmitButtonProps = {
        id: "submitBtn",
        label: 'Submit',
        type: 'submit',
        css: 'btn btn-primary', //Css For Your Button
        disabled: false,
        onClick: () => {console.log("Form Button Clicked")}
    };

    const handleSubmit = (data: Record<string, any>) => {
        console.log('Form data:', data);
    };

    return <DynamicForm fields={ formFields } onSubmit={ handleSubmit } button={ button } />;
}

export default App;
```

### Field Configuration
__`Form Input Fields`__

| Property      | Type                                                                                                           | Description                                                                                                                                                                                  | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`          | `string`                                                                                                       | Unique identifier for the form field.                                                                                                                                                        | ✅        |
| `errorId`     | `{id: string, css: string}`                                                                                    | Options for ID and CSS for the error message element.                                                                                                                                        | ✅        |
| `label`       | `string`                                                                                                       | Label text for the form field.                                                                                                                                                               | ✅        |
| `type`        | `'text'` \| `'number'` \| `'email'` \| `'password'` \| `'checkbox'` \| `'select'` \| `'radio'` \| `'textarea'` | The type of input field, determining how the field will behave and be rendered.                                                                                                              | ✅        |
| `options`     | `{ value: string; label: string }[]`                                                                           | Options for `select`, `checkbox`, or `radio` fields. Required when using these field types.                                                                                                  | ❌        |
| `placeholder` | `string`                                                                                                       | Placeholder text for `text`, `number`, `email`, `password`, and `textarea` input fields.                                                                                                     | ❌        |
| `required`    | `boolean`                                                                                                      | Indicates whether the form field is required to be filled.                                                                                                                                   | ❌        |
| `validation`  | `RegisterOptions`                                                                                              | Validation rules for the field using `react-hook-form`'s `RegisterOptions`. This allows you to specify rules like `required`, `maxLength`, etc.                                              | ❌        |
| `icon`        | `React.ReactNode`                                                                                              | Optional icon to be displayed with the input field. Can use components from libraries like `react-icons`.                                                                                    | ❌        |
| `value`       | `string`                                                                                                       | Default value of the field if it needs to be pre-filled.                                                                                                                                     | ❌        |
| `css`         | `{ wrapper: string, label?: string, input: string, icon?: string, error?: string }`                            | An object for defining the CSS classes used for styling different parts of the field, including the wrapper(containing the _icon_, _label_, _input field_), label, input, icon, and error message. | ✅        |

__`Button Props`__
| Property   | Type                                  | Description                                                                                 | Required |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | -------- |
| `type`     | `'button'` \| `'submit'` \| `'reset'` | Specifies the type of button, whether it's a normal button, submit button, or reset button. | ✅        |
| `label`    | `string`                              | Text label displayed on the button.                                                         | ✅        |
| `onClick`  | `() => void`                          | Function to be called when the button is clicked.                                           | ❌        |
| `disabled` | `boolean`                             | Specifies whether the button is disabled or not.                                            | ❌        |
| `css`      | `{ button: string }`                  | An object that defines the CSS class for the button.                                        | ✅        |

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