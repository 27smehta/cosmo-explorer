import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationLink, setVerificationLink] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (siteKey && !captchaToken) {
      toast.error('Please complete the CAPTCHA');
      return;
    }

    try {
      setLoading(true);
      setVerificationLink(null);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, captchaToken }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      toast.success(data.message || 'Subscription successful!');
      
      if (import.meta.env.DEV && data.verificationLink) {
        setVerificationLink(data.verificationLink);
      }
      
      setEmail('');
      setCaptchaToken(null);
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-space-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-gray-300 mb-6">
        Stay updated with the latest space news, discoveries, and events.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {siteKey && (
          <div className="flex justify-center">
            <HCaptcha
              sitekey={siteKey}
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (siteKey && !captchaToken)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {import.meta.env.DEV && verificationLink && (
        <div className="mt-4 p-4 bg-space-700 rounded-md">
          <p className="text-sm text-gray-300">Development Mode - Verification Link:</p>
          <a
            href={verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 break-all"
          >
            {verificationLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscription; 