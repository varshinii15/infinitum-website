'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginComponent from './components/LoginComponent';
import RegisterModeComponent from './components/RegisterModeComponent';
import SendEmailComponent from './components/SendEmailComponent';
import RegisterComponent from './components/RegisterComponent';
import CallbackComponent from './components/CallbackComponent';
import VerifyEmailComponent from './components/VerifyEmailComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';

function AuthRouter() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    switch (type) {
        case 'login':
            return <LoginComponent />;
        case 'register':
            return <RegisterModeComponent />;
        case 'send-email':
            return <SendEmailComponent />;
        case 'complete-registration':
            return <RegisterComponent />;
        case 'callback':
            return <CallbackComponent />;
        case 'verify-email':
            return <VerifyEmailComponent />;
        case 'forgot-password':
            return <ForgotPasswordComponent />;
        default:
            return <LoginComponent />;
    }
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-loading">
                        <div className="auth-spinner"></div>
                        <h2>Loading...</h2>
                    </div>
                </div>
            </div>
        }>
            <AuthRouter />
        </Suspense>
    );
}
