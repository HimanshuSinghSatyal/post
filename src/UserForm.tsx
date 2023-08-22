import React, { useState, ChangeEvent, FormEvent,FC, useEffect } from 'react';
import { TextField,Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const UserForm:FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  localStorage.setItem('user', JSON.stringify(formData));
    navigate('/post');
  console.log(formData);
};

  return (
    <Container sx={{
      display:"flex",
      flexDirection:"columm",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
    }} 
      >
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{
          display: "block",
        }}
        label="Name"
        name="name"
        margin= 'normal'
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        sx={{
          display: "block",
        }}
        label="Phone number"
        name="phoneNumber"
        margin= 'normal'
        type="number"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        required
      />
      <TextField
        sx={{
          display: "block",
        }}
        label="Email"
        type="email"
        name="email"
        margin= 'normal'
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <Button
        sx={{
          width: "250px",
        }}
        type="submit" 
        variant="contained"
        color="primary"
        >
        Submit
      </Button>
    </form>
    </Container>

  );
};

export default UserForm;
