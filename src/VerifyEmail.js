import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided. If you have already verified your email, you can log in.');
      return;
    }

    fetch('https://addlife-production.up.railway.app/api/users/verify-email?token=' + token)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatus('success');
          setMessage(data.message);
        } else if (data.error) {
          // Handle already verified or already used token
          if (data.error.toLowerCase().includes('already verified') || data.error.toLowerCase().includes('already used')) {
            setStatus('success');
            setMessage('Your email is already verified! You can log in.');
          } else {
            setStatus('error');
            setMessage(data.error || 'Verification failed.');
          }
        } else {
          setStatus('error');
          setMessage('Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. Please try again later.');
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
        </>
      )}
    </div>
  );
} 