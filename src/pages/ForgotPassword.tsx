import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your official email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate recovery link dispatch
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2" title="Return to Homepage">
            <div className="h-10 w-10 rounded-lg bg-olive-500 flex items-center justify-center text-white shadow-xs">
              <Scan className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-text-primary tracking-tight">Dr. Standards</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-semibold text-text-primary tracking-tight">
          Reset password
        </h2>
        <p className="mt-1 text-center text-sm text-text-secondary">
          Enter your official government or enterprise email to receive password recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xs border border-border sm:rounded-xl sm:px-10">
          {submitted ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-olive-50 border border-olive-200 text-sm text-olive-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-olive-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-olive-900">Recovery email sent</h4>
                  <p className="text-xs text-olive-700 mt-1 leading-relaxed">
                    If an account exists for <strong className="font-medium">{email}</strong>, you will receive password reset instructions shortly.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" fullWidth size="lg">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <Input
                  label="Official Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="officer.name@nic.in"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="pt-3 text-center">
                <Link to="/login" className="text-xs text-olive-600 hover:text-olive-700 font-medium">
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
