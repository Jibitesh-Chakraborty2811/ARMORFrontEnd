import React from 'react'
import './App.css'
export default function Privacy() {
  return (
    <div id='PrivacyDiv'>
      <h1 id="privacy-header">Privacy</h1>
      <p id="privacy-header2">"Privacy is the foundation of freedom."</p>
      <p>
      In our app, privacy features like FaceLock and fingerprint recognition serve as critical safeguards,
       ensuring that users maintain control over their personal safety data. These options offer an additional layer
        of security, preventing unauthorized access and protecting sensitive information from prying eyes. By incorporating 
        such privacy measures, we prioritize the autonomy and peace of mind of our users, empowering them to confidently
         utilize our app's resources while safeguarding their privacy.
      </p>
      <p id="fingerprint">Switch Fingerprint scanner on : <label className="switch">
        <input type="checkbox" id="toggleBtn"/>
          <span className="slider round"></span>
          </label></p>
      <p id="face-lock">Switch Face recognition on : <label className="switch">
        <input type="checkbox" id="toggleBtn"/>
          <span className="slider round"></span>
          </label></p>
    </div>
  )
}
