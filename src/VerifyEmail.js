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
      .then(async res => {
        const data = await res.json();
        if (res.status === 200) {
          setStatus('success');
          setMessage(data.message || 'Your email is verified! You can now log in.');
        } else {
          setStatus('error');
          setMessage('This link is invalid or expired. If you have already verified your email, you can now log in.');
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
      <div aria-live="polite" style={{ minHeight: 40 }}>
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
    </div>
  );
} 