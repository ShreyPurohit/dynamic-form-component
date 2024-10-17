# Dynamic Form Component

This package provides a fully customizable dynamic form component for React, built to support various input types and customizable layouts, including support for both Tailwind and Bootstrap. Users can pass an array of form fields and control various form behaviors, CSS classes, validation rules, default values and form submission handlers.

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
npm install react-hook-form react-icons
```

## Features
* __Flexible Input Types:__ Supports `text`, `number`, `email`, `password`, `checkbox`, `radio`, `select`, and `textarea` fields.
* __Customizable Layouts:__ Customize CSS classes for each field component (wrapper, label, input, icon, error).
* __Default Values:__ Fields can have a `defaultValue` to pre-fill inputs.
* __Default Checks for Checkbox and Radio Fields:__ The `options` property allows setting defaultChecked for checkbox and radio inputs.
* __Grid CSS Support:__ Easily switch between grid and flex layouts by specifying layout types and CSS.
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
function App() {
    const formFields: IFormField[] = [
        {
            id: 'name',
            label: 'Name',
            error: {
                id: 'nameErr',
                // Add Bootstrap Or Tailwind CSS here
                css: 'text-red-500 text-sm',
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
            css: {
                // Add Bootstrap Or Tailwind CSS here
                wrapper: 'flex items-center p-1 border',
                label: 'block text-gray-700 sm:text-lg font-bold mb-2',
                input:
                    'rounded w-full sm:py-2 sm:px-3 py-1 px-2 text-stone-600 leading-tight focus:outline-none text-sm sm:text-base',
                icon: 'ml-2',
            },
        },
        {
            id: 'password',
            error: {
                id: 'passErr',
                // Add Bootstrap Or Tailwind CSS here
                css: 'text-red-500 text-sm',
            },
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your Password',
            validation: {
                required: 'Password is required',
            },
            icon: <AiOutlineLock />,
            css: {
                wrapper: 'flex items-center p-1 border',
                label: 'block text-gray-700 sm:text-lg font-bold mb-2',
                input:
                    'rounded w-full sm:py-2 sm:px-3 py-1 px-2 text-stone-600 leading-tight focus:outline-none text-sm sm:text-base',
                icon: 'ml-2',
            },
        },
        // Add more form fields here
    ];

    const button: ISubmitButtonProps = {
        id: "SubmitBtn",
        label: 'Submit',
        type: 'submit',
        css: 'px-4 py-3 rounded-md bg-green-200 mt-5 hover:bg-green-500 transition w-full', //Css For Your Button
        disabled: false,
        onClick: () => { console.log("Form Button Clicked") }
    };

    const handleSubmit = (data: Record<string, any>) => {
        console.log('Form data:', data);
    };

  return (
    <div className="w-2/5 m-auto mt-5 border p-2 border-slate-300 rounded-xl">
      <h1 className="uppercase text-3xl font-bold tracking-wide text-center text-stone-500 border-b-2 mb-2">Dynamic Form</h1>
      <DynamicForm
        fields={formFields}
        onSubmit={handleSubmit}
        button={button}
        layout={{ type: 'grid', css: 'grid-cols-2 gap-2' }}
      />
    </div>
    // For Flex layout={{ type: 'flex', css: 'flex-col gap-2' }}
  )
}

export default App
```

#### For All Fields Usage With Tailwind, Visit : [Usage With Tailwind CSS](https://stackblitz.com/edit/vitejs-vite-sz43gb?file=src%2FApp.tsx)
#### For All Fields Usage With Bootstrap, Visit : [Usage With Bootstrap CSS](https://stackblitz.com/edit/vitejs-vite-pwkgpx?file=src%2FApp.tsx)

### Field Configuration
__`Form Input Fields`__
| Property      | Type                                                                                                           | Description                                                                                                                                                                                        | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`          | `string`                                                                                                       | Unique identifier for the form field.                                                                                                                                                              | ✅        |
| `label`       | `string`                                                                                                       | Label text for the form field.                                                                                                                                                                     | ✅        |
| `value`       | `string`                                                                                                       | Default value of the field if it needs to be pre-filled.                                                                                                                                           | ❌        |
| `type`        | `'text'` \| `'number'` \| `'email'` \| `'password'` \| `'checkbox'` \| `'select'` \| `'radio'` \| `'textarea'` | The type of input field, determining how the field will behave and be rendered.                                                                                                                    | ✅        |
| `options`     | `{ value: string; label: string; defaultChecked?: boolean }[]`                                               | Options for `select`, `checkbox`, or `radio` fields. Required when using these field types.                                                                                                        | ✅ (if type is checkbox, radio, or select) |
| `placeholder` | `string`                                                                                                       | Placeholder text for `text`, `number`, `email`, `password`, and `textarea` input fields.                                                                                                           | ❌        |
| `required`    | `boolean`                                                                                                      | Indicates whether the form field is required to be filled.                                                                                                                                         | ❌        |
| `validation`  | `RegisterOptions`                                                                                              | Validation rules for the field using `react-hook-form`'s `RegisterOptions`. This allows you to specify rules like `required`, `maxLength`, etc.                                                    | ❌        |
| `icon`        | `React.ReactNode`                                                                                              | Optional icon to be displayed with the input field. Can use components from libraries like `react-icons`.                                                                                          | ❌        |
| `css`         | `{ wrapper?: string, label?: string, input?: string, icon?: string }`                            | An object for defining the CSS classes used for styling different parts of the field, including the wrapper (containing the _icon_, _label_, _input field_), label, input, and icon | ❌        |
| `error`       | `{ id?: string; css?: string }`                                                                                | Options for ID and CSS for the error message element.                                                                                                                                              | ❌        |
| `defaultValue`| `string`                                                                                                       | Default value to be used when the field is initialized.                                                                                                                                           | ❌        |


__`Button Props`__
| Property   | Type                                  | Description                                                                                 | Required |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | -------- |
| `type`     | `'button'` \| `'submit'` \| `'reset'` | Specifies the type of button, whether it's a normal button, submit button, or reset button. | ✅        |
| `label`    | `string`                              | Text label displayed on the button.                                                         | ✅        |
| `onClick`  | `() => void`                          | Function to be called when the button is clicked.                                           | ❌        |
| `disabled` | `boolean`                             | Specifies whether the button is disabled or not.                                            | ❌        |
| `css`      | `string`                  | An text that defines the CSS class for the button.                                        | ❌        |

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