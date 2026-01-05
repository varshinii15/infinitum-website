'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import '../auth.css';

export default function VerifyEmailComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setError('Invalid verification link');
                setLoading(false);
                return;
            }

            try {
                const response = await authService.verifyEmail(token);

                if (response.email) {
                    localStorage.setItem('registration_email', response.email);
                }

                setSuccess(true);
                setLoading(false);

                setTimeout(() => {
                    router.push('/auth?type=complete-registration&source=email');
                }, 2000);
            } catch (err) {
                console.error('Verification error:', err);
                setError(err.response?.data?.message || 'Email verification failed');
                setLoading(false);
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    if (loading) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-loading">
                            <div className="auth-spinner"></div>
                        </div>
                        <h1>Verifying Email</h1>
                        <p>Please wait while we verify your email address...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-error">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1>Verification Failed</h1>
                        <p style={{ color: '#fca5a5' }}>{error}</p>
                    </div>
                    <button
                        onClick={() => router.push('/auth?type=send-email')}
                        className="auth-btn"
                        style={{ marginTop: '24px' }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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
                        <h1>Email Verified!</h1>
                        <p>Your email has been successfully verified.</p>
                        <p className="auth-status-text">Redirecting to complete registration...</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
