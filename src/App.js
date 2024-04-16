import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Alert from './Alert';
import Warn from './Warn'; // Import the Warn component
import Contact from './Contact';
import Discover from './Discover';
import Profile from './Profile';
import Premium from './Premium';
import useAudioRecorder from './useAudioRecorder'; // Import the custom hook for audio recording
import useVideoRecorder from './useVideoRecorder'; // Import the custom hook for video recording
import PastRecordings from './PastRecordings';
import Share from './sharewithfriends';
import Privacy from './Privacy';
import axios from 'axios';

// Import SplashScreen component
import SplashScreen from './SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // Initial state set to true
  const { isRecording: isAudioRecording, startRecording: startAudioRecording, stopRecording: stopAudioRecording, clearRecording: clearAudioRecording, getBlobUrl: getAudioBlobUrl } = useAudioRecorder();
  const { isRecording: isVideoRecording, startRecording: startVideoRecording, stopRecording: stopVideoRecording, clearRecording: clearVideoRecording, getBlobUrl: getVideoBlobUrl } = useVideoRecorder();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [volumeDownCount, setVolumeDownCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = (loggedInUserId) => {
    setIsLoggedIn(true);
    setUserId(loggedInUserId);
    setShowLogin(false); // Once logged in, hide the login page
    // Store authentication token and user ID in localStorage
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userId', loggedInUserId);
  };

  const handlePanicClick = () => {
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
  };

  const handleAlertClick = () => {
    const url = `http://localhost:5000/alert/${userId}/${latitude}/${longitude}`;

    // Make the HTTP POST request using Axios
    axios.post(url)
      .then(response => {
        // Handle successful response if needed
        alert("Alert Button Working. Current Location is : " + latitude + " " + longitude);
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error sending panic alert:', error);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  useEffect(() => {
    // Check if the user is already logged in using local storage
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    if (userLoggedIn) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, []);

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

  useEffect(() => {
    const handleVolumeDown = (event) => {
      if (event.code === 'ArrowDown') {
        setVolumeDownCount((prevCount) => prevCount + 1);
      }
    };

    document.addEventListener('keydown', handleVolumeDown);

    return () => {
      document.removeEventListener('keydown', handleVolumeDown);
    };
  }, []);

  useEffect(() => {
    if (volumeDownCount === 3) {
      alert('Volume down button pressed thrice!');
      setVolumeDownCount(0);
    }
  }, [volumeDownCount]);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the duration as needed
  }, []);

  return (
    <div className="App">
      <Router>
        {/* Conditional rendering of SplashScreen in fullscreen */}
        {isLoading && <SplashScreen />}

        {!isLoading && ( // Render remaining content when not loading
          <>
            <div className='header'>
              {/* Header content */}
            </div>

            <nav className={`topnav ${isMenuOpen ? 'active' : ''}`}>
              <a href="javascript:void(0);" className="icon" onClick={toggleMenu}>
                &#9776;
              </a>
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <Link className="dropdown-item" to="/contact">Contact</Link>
              <Link className="dropdown-item" to="/explore">Discover</Link>
              <Link className="dropdown-item" to="/premium">Premium</Link>
              <Link className="dropdown-item" to="/pastrecordings">Past Records</Link>
              <Link className="dropdown-item" to="/sharewithfriends">Share</Link>
              <Link className="dropdown-item" to="/privacy">Privacy</Link>
              <Link className='dropdown-item' onClick={handleLogout} to='/'>Logout</Link>
            </nav>

            <Routes>
              <Route
                path="/"
                element={showLogin ? <Login onLogin={handleLogin} /> : <Home />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/explore" element={<Discover />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/pastrecordings" element={<PastRecordings />} />
              <Route path="/sharewithfriends" element={<Share />} />
              <Route path="/warn" element={<Warn userId={userId} />} /> {/* Route for the Warn page */}
              <Route
                path="/profile"
                element={<Profile userId={userId} />}
              />
            </Routes>

            <footer id='Footer'>
              {isAudioRecording || isVideoRecording ? (
                <button onClick={stopAudioRecording}>Stop</button>
              ) : (
                <button onClick={startAudioRecording}>Audio</button>
              )}
              <button id='Alert' onClick={handleAlertClick}>Alert</button>
              <button id='Panic' onClick={handlePanicClick}>Panic</button>
              <button id='Warn'><Link to='/warn' id='WarnLink'>Warn</Link></button>
              {isAudioRecording || isVideoRecording ? (
                <button onClick={stopVideoRecording}>Stop</button>
              ) : (
                <button onClick={startVideoRecording}>Video</button>
              )}
              {/* Display latitude and longitude */}
            </footer>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
