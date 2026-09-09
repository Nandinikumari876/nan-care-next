'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '../../components/Logo';
import { saveSession } from '../../lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/';

  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSendOtp(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send code');
      setStep('otp');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code');
      saveSession(data.token, data.user.email);
      router.push(nextPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="wrap auth-wrap">
        <a href="/" className="auth-logo">
          <Logo size={34} />
        </a>

        <div className="auth-card">
          <h1>Welcome to Nan Care</h1>
          <p className="auth-sub">
            {step === 'email'
              ? "Enter your email and we'll send you a one-time login code — no password needed."
              : `Enter the 6-digit code sent to ${email.trim()}`}
          </p>

          {step === 'email' && (
            <form onSubmit={handleSendOtp} className="auth-form">
              <div>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending…' : 'Send code'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="auth-form">
              <div>
                <label htmlFor="code">6-digit code</label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="••••••"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Verifying…' : 'Verify & continue'}
              </button>
              <button
                type="button"
                className="auth-linkbtn"
                onClick={() => {
                  setStep('email');
                  setCode('');
                  setError('');
                }}
              >
                Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}