import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    profilePicture: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

//   const handleProfilePictureChange = (e) => {
//     setFormData({
//       ...formData,
//       profilePicture: e.target.files[0]
//     });
//   };

  const handleRegister = async (e) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const user = {
      ...formData,
      password: hashedPassword,
    };

    try {
      await axios.post('http://localhost:5000/users', user);
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
      <input type="text" name="surname" onChange={handleChange} placeholder="Surname" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      {/* <input type="file" name="profilePicture" onChange={handleProfilePictureChange} /> */}
      <button type="submit">Register</button>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </form>
  );
};


