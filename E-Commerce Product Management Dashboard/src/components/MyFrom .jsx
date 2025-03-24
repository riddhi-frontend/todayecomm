import React, { useState, useCallback } from 'react';
import { Form, FormLayout, TextField, Button } from '@shopify/polaris';

function MyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Arrow function for handling form submission
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // Add your form submission logic here
  }, [formData]);

  // Arrow function for handling input changes
  const handleChange = useCallback((field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="First Name"
          value={formData.firstName}
          onChange={(value) => handleChange('firstName', value)}
        />
        <TextField
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => handleChange('lastName', value)}
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
        />
        <Button primary submit>
          Submit
        </Button>
      </FormLayout>
    </Form>
  );
}

export default MyForm;