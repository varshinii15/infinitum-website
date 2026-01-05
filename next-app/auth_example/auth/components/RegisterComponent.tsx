'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import colleges from '@/app/CollegeList';

export default function RegisterComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    referral: '',
    accomodation: false,
    discoveryMethod: '',
    source: source || 'email',
    googleId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('registration_email');
    const storedGoogleId = localStorage.getItem('registration_googleId');

    if (!storedEmail) {
      router.push('/auth?type=register');
      return;
    }

    setFormData(prev => ({
      ...prev,
      email: storedEmail || '',
      googleId: storedGoogleId || '',
      source: source || 'email'
    }));
  }, [source, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.source === 'email' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const registrationData: any = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        year: parseInt(formData.year),
        referral: formData.referral,
        accomodation: formData.accomodation,
        discoveryMethod: formData.discoveryMethod,
        source: formData.source
      };

      if (formData.source === 'email') {
        registrationData.password = formData.password;
      } else if (formData.source === 'google') {
        registrationData.googleId = formData.googleId;
      }

      await authService.register(registrationData);

      localStorage.removeItem('registration_email');
      localStorage.removeItem('registration_googleId');

      router.push('/portal/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 py-12">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 space-y-8 border border-slate-700">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Registration</h1>
          <p className="text-gray-300">
            {formData.source === 'google' ? 'Complete your Google registration' : 'Create your account'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email (Read-only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-gray-400"
            />
          </div>

          {/* Password (Only for email source) */}
          {formData.source === 'email' && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* College */}
          <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-300 mb-1">
              College
            </label>
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select your college</option>
              {colleges.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-1">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your department"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          {/* Referral (Optional) */}
          <div>
            <label htmlFor="referral" className="block text-sm font-medium text-gray-300 mb-1">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="referral"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter referral code if any"
            />
          </div>

          {/* Accommodation */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="accomodation"
              name="accomodation"
              checked={formData.accomodation}
              onChange={(e) => setFormData(prev => ({ ...prev, accomodation: e.target.checked }))}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-600 rounded bg-slate-700"
            />
            <label htmlFor="accomodation" className="ml-2 block text-sm text-gray-300">
              I need accommodation
            </label>
          </div>

          {/* Discovery Method */}
          <div>
            <label htmlFor="discoveryMethod" className="block text-sm font-medium text-gray-300 mb-1">
              How did you hear about us?
            </label>
            <select
              id="discoveryMethod"
              name="discoveryMethod"
              value={formData.discoveryMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="friends">Friends/Word of mouth</option>
              <option value="posters">Posters/Flyers</option>
              <option value="college_announcement">College Announcement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/auth?type=login')}
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
