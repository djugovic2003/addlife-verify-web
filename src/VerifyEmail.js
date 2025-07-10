import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided. If you have already verified your email, you can log in.');
      setShowResend(true);
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
          setMessage('This link is invalid or expired. If you have already verified your email, you can now log in. Otherwise, you can resend the verification email below.');
          setShowResend(true);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. Please try again later.');
        setShowResend(true);
      });
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendStatus('pending');
    setMessage('');
    try {
      const res = await fetch('https://addlife-production.up.railway.app/api/users/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail })
      });
      const data = await res.json();
      setResendStatus('success');
      setMessage(data.message || 'If an account with that email exists, a verification email has been sent.');
      setResendEmail('');
    } catch {
      setResendStatus('error');
      setMessage('Failed to resend verification email. Please try again later.');
    }
  };

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
      {showResend && (
        <form onSubmit={handleResend} style={{ marginTop: 30 }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={resendEmail}
            onChange={e => setResendEmail(e.target.value)}
            required
            style={{ padding: 8, width: '80%', marginBottom: 10 }}
            disabled={resendStatus === 'pending'}
          />
          <br />
          <button
            type="submit"
            style={{ padding: 8, width: '80%' }}
            disabled={resendStatus === 'pending'}
          >
            {resendStatus === 'pending' ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </form>
      )}
      <button
        style={{ marginTop: 20, padding: 8, width: '80%' }}
        onClick={() => window.location.href = '/login'}
      >
        Back to Login
      </button>
    </div>
  );
} 