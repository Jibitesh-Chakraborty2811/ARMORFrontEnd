import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const Warn = ({userId}) => {
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    let timer;

    if (isRunning && seconds < duration) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (seconds >= duration) {
      setIsRunning(false);
      handleTimerFinish();
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, duration]);

  useEffect(() => {
    // Function to retrieve current latitude and longitude
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error('Error retrieving location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleTimerFinish = () => {
    const url = `http://localhost:5000/panic/${userId}/${latitude}/${longitude}`;

  // Make the HTTP POST request using Axios
  axios.post(url)
    .then(response => {
      // Handle successful response if needed
      alert("Panic Button Working. Current Location is : " + latitude + " " + longitude);
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error sending panic alert:', error);
    });
    alert('Timer over');
  };

  const handleDurationChange = (event) => {
    const { value } = event.target;
    setDuration(parseInt(value));
  };

  return (
    <div id='WarnContainer'>
      <div id="warn-header"><h1>Warn</h1></div>
      <div id="duration">
        <label id="duration-" htmlFor="duration">Duration (seconds): </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={handleDurationChange}
        />
      </div>
      <div id="warn"><p id="timer">Timer: {seconds} seconds</p></div>
      <button id="warn-button"  onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? 'Stop Timer' : 'Start Timer'}
      </button>
      {/* Display latitude and longitude */}
      {latitude && longitude && (
        <p id="direction">Latitude: {latitude}, Longitude: {longitude}</p>
      )}
    </div>
  );
};

export default Warn;
