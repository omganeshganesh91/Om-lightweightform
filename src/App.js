import React from "react";
import { useSimpleForm } from "./useSimpleForm.js";

function App() {
  const { values, errors, isValid, handleChange, handleSubmit } = useSimpleForm(
    { name: "", email: "", phone: "" },
    {
      name: { required: true, minLength: 3 },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: "Enter a valid email address",
      },
      phone: {
        required: true,
        pattern: /^\d{10}$/,
        patternMessage: "Phone number must be exactly 10 digits",
      },
    }
  );

  const onSubmit = (data) => {
    alert("Form submitted successfully: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>{errors.name}</p>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>{errors.email}</p>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>{errors.phone}</p>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        style={{
          padding: "10px 20px",
          backgroundColor: isValid ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isValid ? "pointer" : "not-allowed"
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default App;
