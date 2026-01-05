'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import Link from 'next/link';
import '../auth/auth.css';

function VerifyEmailContent() {
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('No verification token provided');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await authService.verifyEmail(token);
                setStatus('success');
                setMessage(response.message);
                setEmail(response.email);

                // Store email in localStorage for registration
                localStorage.setItem('registration_email', response.email);

                // Redirect to complete registration after 3 seconds
                setTimeout(() => {
                    router.push('/auth?type=complete-registration&source=email');
                }, 3000);
            } catch (err) {
                setStatus('error');
                setMessage(
                    err.response?.data?.message || 'Email verification failed. The link may have expired or is invalid.'
                );
            }
        };

        verifyToken();
    }, [searchParams, router]);

    if (status === 'loading') {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-loading">
                            <div className="auth-spinner"></div>
                        </div>
                        <h1>Verifying Your Email</h1>
                        <p>Please wait while we verify your email address...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'error') {
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
                        <p style={{ color: '#fca5a5' }}>{message}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                        <Link href="/auth?type=send-email" className="auth-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                            Try Again
                        </Link>
                        <Link href="/" className="auth-btn auth-btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                    <p>{message}</p>
                    <p className="auth-status-text" style={{ marginTop: '8px' }}>
                        Verified email: <strong style={{ color: '#eeeeee' }}>{email}</strong>
                    </p>
                    <p className="auth-status-text" style={{ marginTop: '16px', color: '#e04e94' }}>
                        Redirecting you to complete your registration...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-loading">
                            <div className="auth-spinner"></div>
                        </div>
                        <h1>Verifying Your Email</h1>
                        <p>Please wait while we verify your email address...</p>
                    </div>
                </div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
