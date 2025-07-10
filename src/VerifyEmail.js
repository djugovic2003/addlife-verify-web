import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }
    
    console.log('Attempting to verify token:', token);
    console.log('Backend URL:', 'https://addlife-production.up.railway.app/api/users/verify-email?token=' + token);
    
    fetch('https://addlife-production.up.railway.app/api/users/verify-email?token=' + token)
      .then(res => {
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        return res.json();
      })
      .then(data => {
        console.log('Response data:', data);
        if (data.message) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setStatus('error');
        setMessage('Verification failed. Please check the console for details.');
      });
  }, [token]);

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>AddLife Email Verification</h2>
      {status === 'pending' && <p>Verifying...</p>}
      {status === 'success' && (
        <>
          <p style={{ color: 'green' }}>{message}</p>
          <p>You can now log in to the AddLife app.</p>
        </>
      )}
      {status === 'error' && (
        <>
          <p style={{ color: 'red' }}>{message}</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            Check the browser console (F12) for more details.
          </p>
        </>
      )}
    </div>
  );
} 