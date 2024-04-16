import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios at the top of your file

export default function Profile({ userId }) {
  const [userInfo, setUserInfo] = useState(null); // State to store user information

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Make the HTTP GET request using Axios
        const response = await axios.get(`http://localhost:5000/profile/${userId}`);
        // Update state with the fetched user information
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    // Call the fetchUserInfo function
    fetchUserInfo();
  }, [userId]); // useEffect dependency: userId changes

  return (
    <div id='ProfileDiv'>
      <h2>Profile</h2>
      {userInfo ? (
        <div>
          <p>User ID: {userInfo.uid}</p>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <p>Address: {userInfo.address}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}
