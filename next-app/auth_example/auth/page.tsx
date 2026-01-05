'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginComponent from './components/LoginComponent';
import RegisterModeComponent from './components/RegisterModeComponent';
import SendEmailComponent from './components/SendEmailComponent';
import RegisterComponent from './components/RegisterComponent';
import CallbackComponent from './components/CallbackComponent';
import VerifyEmailComponent from './components/VerifyEmailComponent';

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
    default:
      return <LoginComponent />;
  }
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-main">
        <div className="max-w-md w-full surface-card rounded-xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mb-4">
              <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-theme-primary mb-2">Loading...</h2>
          </div>
        </div>
      </div>
    }>
      <AuthRouter />
    </Suspense>
  );
}
