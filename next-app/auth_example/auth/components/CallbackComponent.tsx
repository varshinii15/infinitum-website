'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';

export default function CallbackComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const email = searchParams.get('email');
        const googleId = searchParams.get('googleId');
        const existingUser = searchParams.get('existing_user') === 'true';
        const source = searchParams.get('source');

        if (!email || !googleId) {
          setError('Invalid callback parameters');
          setLoading(false);
          return;
        }

        if (existingUser && source === 'email') {
          setError('This email is already registered with email/password. Please login with your email and password instead.');
          setLoading(false);
          setTimeout(() => {
            router.push('/auth?type=login');
          }, 3000);
          return;
        }

        if (existingUser) {
          await authService.loginGoogle({ email, googleId, existing_user: true });
          router.push('/portal/profile');
        } else {
          localStorage.setItem('registration_email', email);
          localStorage.setItem('registration_googleId', googleId);
          router.push('/auth?type=complete-registration&source=google');
        }
      } catch (err: any) {
        console.error('Callback error:', err);
        setError(err.response?.data?.message || 'Authentication failed');
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
        <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 space-y-6 border border-slate-700">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 mb-4">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Error</h2>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => router.push('/auth?type=login')}
              className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 space-y-6 border border-slate-700">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-900/50 mb-4">
            <svg className="animate-spin h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Processing Authentication</h2>
          <p className="text-gray-300">Please wait while we complete your Google sign-in...</p>
        </div>
      </div>
    </div>
  );
}
