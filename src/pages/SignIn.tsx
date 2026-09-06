import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scan, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/app';

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await login(email, password, rememberMe);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: res.error || 'Invalid credentials. Please try again.' });
      }
    } catch {
      setErrors({ general: 'An error occurred while signing in. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('ashwin.sharma@gov.in');
    setPassword('GovPass2026!');
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
          Welcome back
        </h2>
        <p className="mt-1 text-center text-sm text-text-secondary">
          Sign in to continue to your standards analysis workspace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xs border border-border sm:rounded-xl sm:px-10">
          {errors.general && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errors.general}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <Input
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="officer.name@nic.in"
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Enter your password"
                  disabled={loading}
                  className={`flex h-10 w-full rounded-md border bg-surface px-3 py-2 pr-10 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                    errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-border'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary focus:outline-none"
                  tabIndex={-1}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border text-olive-500 focus:ring-olive-500 h-4 w-4"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-olive-600 hover:text-olive-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={loading}
              className="mt-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border flex flex-col gap-3">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs text-olive-700 hover:text-olive-800 bg-olive-50/70 hover:bg-olive-100 border border-olive-200 py-2 px-3 rounded-md transition-colors text-center font-medium"
            >
              Fill Demo Officer Credentials
            </button>

            <p className="text-center text-xs text-text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="text-olive-600 hover:text-olive-700 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
            ← Return to Dr. Standards Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
