import React, { useEffect, useState } from 'react';
import './SplashScreen.css'; // Import CSS for styling
// Import CSS for styling

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the duration as needed
  }, []);

  return (
    <div className={`splash-screen ${loading ? 'show' : 'hide'}`}>
      <img src="/armor-logo.png" alt="Armor Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
