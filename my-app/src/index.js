import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';

const root = ReactDOM.createRoot(document.getElementById('landingpage-root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ReactDOM.render(
//   <React.StrictMode>
//     <LandingPage /> {/* Render the new entry point component */}
//   </React.StrictMode>,
//   document.getElementById('landingpage-root') // Update the target DOM element if necessary
// );
