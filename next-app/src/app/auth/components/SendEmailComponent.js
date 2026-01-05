'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import '../auth.css';

export default function SendEmailComponent() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.sendVerificationEmail({ email });
            localStorage.setItem('registration_email', email);
            setSuccess(true);
            setTimeout(() => {
                router.push('/auth?type=login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send verification email');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-success">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1>Check Your Email</h1>
                        <p>
                            We've sent a verification link to <strong>{email}</strong>
                        </p>
                        <p className="auth-status-text">
                            Click the link in the email to continue your registration.
                        </p>
                        <p className="auth-status-text" style={{ marginTop: '8px' }}>
                            Redirecting to login...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Verify Your Email</h1>
                    <p>Enter your email to receive a verification link</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="auth-btn">
                        {loading ? 'Sending...' : 'Send Verification Email'}
                    </button>
                </form>

                <div className="auth-links">
                    <button
                        onClick={() => router.push('/auth?type=register')}
                        className="auth-link"
                    >
                        ← Back to registration options
                    </button>
                </div>
            </div>
        </div>
    );
}
