import { useState, useEffect } from "react";

/**
 * useSimpleForm - lightweight React form validation hook
 *
 * @param {Object} initialValues - default values of inputs
 * @param {Object} validations - validation rules for each field
 */
export function useSimpleForm(initialValues = {}, validations = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name, value) => {
    const rules = validations[name];
    let error = "";

    if (!rules) return "";

    if (rules.required && !value.trim()) {
      error = "This field is required";
    } else if (rules.minLength && value.length < rules.minLength) {
      error = `Minimum ${rules.minLength} characters required`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      error = rules.patternMessage || "Invalid format";
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

 
  const checkFormValidity = () => {
    const fieldNames = Object.keys(validations);
    const hasErrors = fieldNames.some(name => errors[name]);
    const hasEmptyRequiredFields = fieldNames.some(name => {
      const rules = validations[name];
      return rules.required && !values[name]?.trim();
    });
    setIsValid(!hasErrors && !hasEmptyRequiredFields);
  };

  useEffect(() => {
    checkFormValidity();
  }, [values, errors]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = callback => e => {
    e.preventDefault();
    let valid = true;
    Object.keys(validations).forEach(name => {
      const error = validateField(name, values[name] || "");
      if (error) valid = false;
    });
    if (valid) callback(values);
  };

  return { values, errors, isValid, handleChange, handleSubmit };
}
