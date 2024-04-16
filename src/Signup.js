import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: '',
    emergencyContacts: ['', '', ''],
    aadhaarNumber: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmergencyContactChange = (index, value) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = value;
    setFormData({
      ...formData,
      emergencyContacts: updatedContacts
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      // Make the HTTP POST request using Axios
      await axios.post(`http://localhost:5000/signup/${formData.name}/${formData.userId}/${formData.password}/${formData.email}/${formData.address}/${formData.phoneNumber}/${formData.emergencyContacts[0]}/${formData.emergencyContacts[1]}/${formData.emergencyContacts[2]}/${formData.aadhaarNumber}`);
      // Redirect to login page after successful registration
      // You can add your redirection logic here
      console.log('User registered successfully!');
      alert('Registration was successful. You may login now');
    } catch (error) {
      // Handle error if request fails
      console.error('Error registering user:', error);
    }
  };

  return (
    <div id='SignUpDiv'>
      <h2 id="signup-header">Signup</h2>
      <form onSubmit={handleSubmit} action='/'>
        <div>
          <label id="Signup-name" htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label id="Signup-userid" htmlFor="userId">User ID:</label>
          <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
        </div>
        <div>
          <label id="Signup-password" htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label id="Signup-email" htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label id="Signup-phone" htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label id="Signup-address"htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label id="Signup-c1" htmlFor="emergencyContact1">Emergency Contact 1:</label>
          <input type="text" id="emergencyContact1" value={formData.emergencyContacts[0]} onChange={(e) => handleEmergencyContactChange(0, e.target.value)} />
        </div>
        <div>
          <label id="Signup-c2" htmlFor="emergencyContact2">Emergency Contact 2:</label>
          <input type="text" id="emergencyContact2" value={formData.emergencyContacts[1]} onChange={(e) => handleEmergencyContactChange(1, e.target.value)} />
        </div>
        <div>
          <label id="Signup-c3" htmlFor="emergencyContact3">Emergency Contact 3:</label>
          <input type="text" id="emergencyContact3" value={formData.emergencyContacts[2]} onChange={(e) => handleEmergencyContactChange(2, e.target.value)} />
        </div>
        <div>
          <label id="Signup-aadhar" htmlFor="aadhaarNumber">Aadhaar Number:</label>
          <input type="text" id="aadhaarNumber" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
        </div>
        <div id='FileDiv'>
          <label id="Signup-file"htmlFor="file">Upload Passport:</label>
          <p>*Signing up for Double verification will add a further 10% discount on Power & Deluxe User Subscriptions.</p>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
        </div>
        <button id="signup-button" type="submit">Register</button>
        <p></p>
        <p id="double-verify">Double verified  
        <label className="switch">
        <input type="checkbox" id="toggleBtn"/>
          <span className="slider round"></span>
          </label>
          </p>
      </form>
      <p>Already have an account? <Link id="login-signup"to="/">Login</Link></p>
      
    </div>
  );
}
