import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(token);
    if (!success) {
      setError('Invalid authentication token');
    }
  };

  const quickLogin = (userToken: string) => {
    setToken(userToken);
    login(userToken);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-xl">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your authentication token to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
              Authentication Token
            </label>
            <input
              id="token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your token"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4 text-center">Quick login for testing:</p>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin('admin-token-123')}
              className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-sm"
            >
              <span className="font-medium text-gray-900">Admin User</span>
              <span className="block text-xs text-gray-500 mt-1">admin-token-123</span>
            </button>
            <button
              onClick={() => quickLogin('user-token-456')}
              className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-sm"
            >
              <span className="font-medium text-gray-900">John Doe</span>
              <span className="block text-xs text-gray-500 mt-1">user-token-456</span>
            </button>
            <button
              onClick={() => quickLogin('user-token-789')}
              className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-sm"
            >
              <span className="font-medium text-gray-900">Jane Smith</span>
              <span className="block text-xs text-gray-500 mt-1">user-token-789</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
