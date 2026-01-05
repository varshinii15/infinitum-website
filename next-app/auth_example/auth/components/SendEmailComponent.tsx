'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export default function SendEmailComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
        <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 space-y-6 border border-slate-700">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/50 mb-4">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-300">
              We've sent a verification link to <span className="font-semibold text-white">{email}</span>
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Click the link in the email to continue your registration.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 space-y-8 border border-slate-700">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-gray-300">Enter your email to receive a verification link</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            {loading ? 'Sending...' : 'Send Verification Email'}
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center text-sm text-gray-300">
          <button
            onClick={() => router.push('/auth?type=register')}
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            ← Back to registration options
          </button>
        </div>
      </div>
    </div>
  );
}
