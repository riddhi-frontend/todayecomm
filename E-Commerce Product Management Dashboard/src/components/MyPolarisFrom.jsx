import React, { useState } from 'react';
import { Form, FormLayout, TextField, Button } from '@shopify/polaris';

const MyPolarisForm = () => {
  // State for the form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Event handler for the first name field
  const handleFirstNameChange = (value) => {
    setFirstName(value);
  };

  // Event handler for the last name field
  const handleLastNameChange = (value) => {
    setLastName(value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Do something with the form data (e.g., send to an API)
    console.log('Form submitted:', { firstName, lastName });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <Button primary>Submit</Button>
      </FormLayout>
    </Form>
  );
};

export default MyPolarisForm;