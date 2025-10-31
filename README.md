# om-lightweightform

**Keywords:** React form validation, custom hook, email validation, phone validation, form state management, lightweight form library, input validation, form submission, React hooks, zero-dependency validation, react, hook, validation, form-validation, react-hook, validation-hook, input-validation, error-messages, realtime-validation, custom-validation, react-forms, form-check, type-checking, use-validation, field-validation, form-error-handling, react-validation-dev, validator, validator-dev, validation-dev, form library, React form hook, validation library, JavaScript validation, frontend validation, user input validation, form handling, React components, state management, error handling, form validation rules

A lightweight React hook for form validation without Formik or Yup.

## Description

`om-lightweightform` is a simple Email,phone Validator, zero-dependency React hook that provides form validation capabilities. It allows you to manage form state, validate inputs based on custom rules, and handle form submissions easily. This hook is designed to be lightweight and easy to use, making it a great alternative to heavier libraries like Formik and Yup.

## Installation

Install the package via npm:

```bash
npm install om-lightweightform
```

## Usage

Import the `useSimpleForm` hook into your React component:

```javascript
import { useSimpleForm } from 'om-lightweightform';
```

Then, use it in your component:

```javascript
const { values, errors, isValid, handleChange, handleSubmit } = useSimpleForm(
  initialValues,
  validations
);
```

## API Reference

### `useSimpleForm(initialValues, validations)`

#### Parameters

- `initialValues` (Object): An object containing the default values for the form fields.
- `validations` (Object): An object defining validation rules for each field. Each field can have the following rules:
  - `required` (boolean): Whether the field is required.
  - `minLength` (number): Minimum length for the field value.
  - `pattern` (RegExp): A regular expression to validate the field value.
  - `patternMessage` (string): Custom error message for pattern validation.

#### Returns

- `values` (Object): Current values of the form fields.
- `errors` (Object): Current validation errors for each field.
- `isValid` (boolean): Whether the entire form is valid.
- `handleChange` (function): Event handler for input changes. Pass this to the `onChange` prop of your inputs.
- `handleSubmit` (function): Function that returns an event handler for form submission. Pass a callback function to handle valid form submissions.

## Example

Here's a complete example of a simple form using `useSimpleForm`:

```javascript
import React from 'react';
import { useSimpleForm } from 'om-lightweightform';

function ContactForm() {
  const { values, errors, isValid, handleChange, handleSubmit } = useSimpleForm(
    { name: '', email: '', phone: '' },
    {
      name: { required: true, minLength: 3 },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Enter a valid email address',
      },
      phone: {
        required: true,
        pattern: /^\d{10}$/,
        patternMessage: 'Phone number must be exactly 10 digits',
      },
    }
  );

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.name}</p>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.email}</p>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.phone}</p>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        style={{
          padding: '10px 20px',
          backgroundColor: isValid ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isValid ? 'pointer' : 'not-allowed'
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
```

## License

MIT
