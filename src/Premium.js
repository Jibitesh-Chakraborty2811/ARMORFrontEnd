import React from 'react'
import './App.css'
export default function Premium() {
  return (
    <div id='PremiumDiv'>
      <h1 id="premium-head1">Premium</h1>
      <div>
      <h2 >PRICING OPTIONS:</h2>
      <div>
        <h3 id="standard-user">Standard User:</h3>
        <p ><strong>PRICE:</strong> <span id="standard-user-price">FREE</span></p>
        <p>
          This provides the free app with all the basic necessary features fundamental to the safety of women. This will include the 3 buttons:
        </p>
        <ul>
          <li >PANIC</li>
          <li >WARNING</li>
          <li >ALERT</li>
        </ul>
        <p  >performing their assigned functions.</p>
      </div>

      <div>
        <h3 id="power-user">Power User:</h3>
        <p ><strong>PRICE:</strong><span id="power-user-price">Monthly: 29.00 INR, Annual: 290.00 INR</span> </p>
        <p>
          All features present in Standard included as well as added features:
        </p>
        <ul>
          <li>Power button activation</li>
          <li>Fingerprint Sensor access</li>
          <li>Audio Recording</li>
        </ul>
      </div>

      <div>
        <h3 id="deluxe-user">Deluxe User:</h3>
        <p ><strong>PRICE:</strong> <span id="deluxe-user-price">Monthly: 49.00 INR, Annual: 490.00 INR</span></p>
        <p>
          This will provide the most premium experience for users. In addition to the Power user features it boasts:
        </p>
        <ul>
          <li>Video Recording</li>
          <li>Live Streaming capabilities</li>
          <li>Fake calling</li>
        </ul>
        <p ><strong>
          *We will also provide a 3-month subscription service (Deluxe) on the purchase of our ordered device (our safety gadget).
          </strong></p>
      </div>

      <div>
        <p ><strong>** Signing up for Double verification will add a further 10% discount on Power & Deluxe User subscriptions.</strong></p>
      </div>
    </div>
    </div>
  )
}
