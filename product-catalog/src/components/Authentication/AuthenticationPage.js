import React, { useState } from 'react';
import AuthForm from './AuthForm'; // Adjust the import path based on your project structure
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = () => {
  const [role, setRole] = useState('');
  const [allActors,setAllActors] = useState([]);
  const navigate = useNavigate();

  const fetchActors = async () => {
    try {
      const response = await axios.get(`/actors`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching actors:', error);
      return []; // Return an empty array or handle the error as needed
    }
  };
  
  const handleLogin = async (credentials) => {
    const isValidUser = await validateUser(credentials);
    if (isValidUser) {
      const fetchedActors = await fetchActors(); // Wait for the fetchActors function to complete
      const fetchedAct = fetchedActors.find(act => act.username === credentials.username && act.password === credentials.password);
        const userInfoWithRole = { ...credentials, role: role, id:fetchedAct.id};
      //console.log('User logged in:', userInfoWithRole);
      //storing actor data in local storage

      localStorage.setItem('currentUser',JSON.stringify(userInfoWithRole));
        console.log("Stored User:",JSON.parse(localStorage.getItem('currentUser')));
      // Navigate based on user role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        navigate('/user');
      }
    } else {
      console.log('Invalid username or password');
      // Handle invalid login
    }
  };

  const handleRegister = async (userInfo) => {
    try {
      // Add the 'role' attribute with value 'user' to the userInfo object
      const userInfoWithRole = { ...userInfo, role: 'user' };

      // Simulate user registration by sending a POST request to a local endpoint
      const response = await axios.post(`./actors/`, userInfoWithRole); // Adjust the path as needed

      if (response.status === 201) {
        console.log('User registered:', userInfo.username);

        // Now you can update your local data (if applicable)

        // Assuming 'data' is your local data array, you can add the new user
        // data.push(userInfoWithRole);

        // Perform further actions after successful registration
        // Navigate to appropriate page based on the user role
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'user') {
          navigate('/user');
        }
      } else {
        console.log('User registration failed');
        // Handle registration failure
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const validateUser = async (credentials) => {
    try {
      const response = await axios.get(`./actors/`); // Adjust the path as needed
      const data = response.data;

      if (!data) return false;

      const user = data.find(
        (u) => u.username === credentials.username && u.password === credentials.password
      );

      if (!user) return false;

      // Check user role (admin or user)
      const userRole = user.role === 'admin' ? 'admin' : 'user';
      setRole(userRole); // Immediately set the role
      return true;
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      return false;
    }
  };

  return (
    <div>
      <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};


export default AuthenticationPage;
