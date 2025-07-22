


// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
import axios from 'axios';

// --- Main Auth Page Component ---
export const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden" style={{ height: '650px' }}>
            {/* Left Panel: Welcome Message & Image */}
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center p-12 text-white flex-col justify-between"
                style={{ backgroundImage: "url('https://placehold.co/600x800/1e3a8a/ffffff?text=FishLink')" }}
            >
                <div>
                    <h2 className="text-4xl font-bold leading-tight">Welcome to the Future of Fresh Seafood.</h2>
                    <p className="mt-4 text-blue-200 opacity-90">
                        Join our community to connect directly with fishermen and buyers, ensuring fair prices and unmatched freshness.
                    </p>
                </div>
                <p className="text-sm text-blue-300">© 2025 FishLink</p>
            </div>

            {/* Right Panel: Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-700">🐟 FishLink</h1>
                </div>

                {/* Login/Register Toggle */}
                <div className="flex justify-center bg-gray-100 rounded-full p-1 mb-8">
                    <button
                        onClick={() => setIsLoginView(true)}
                        className={`w-1/2 py-2 font-semibold rounded-full transition-colors ${isLoginView ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLoginView(false)}
                        className={`w-1/2 py-2 font-semibold rounded-full transition-colors ${!isLoginView ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}
                    >
                        Register
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLoginView ? 'login' : 'register'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isLoginView ? <LoginForm setView={setIsLoginView} /> : <RegisterForm setView={setIsLoginView} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Helper: Error Message Component ---
const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
        <AlertCircle size={16} />
        <span>{message}</span>
    </div>
);

// --- Login Form Component (FIXED) ---
const LoginForm = ({ setView }: { setView: (isLogin: boolean) => void }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            // FIX: The API response data (containing both token and user) is now passed to the login function.
            // The AuthContext will be responsible for handling both pieces of data.
            const { user } = response.data;
            login(response.data); // Pass the entire data object { token, user }

            // The redirection logic remains the same.
            if (user) {
                if (user.role === 'fisherman') {
                    navigate('/fisherman-dashboard');
                } else if (user.role === 'buyer') {
                    navigate('/buyer-dashboard');
                } else {
                    navigate('/'); // Fallback redirect
                }
            } else {
                throw new Error("Login successful, but no user data was received.");
            }

        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition-colors">
                {isLoading ? 'Logging in...' : <><LogIn size={20} /><span>Login</span></>}
            </button>
        </form>
    );
};

// --- Register Form Component ---
const RegisterForm = ({ setView }: { setView: (isLogin: boolean) => void }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'fisherman' | 'buyer' | 'admin'>('fisherman');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            setSuccess(response.data.message);
            setTimeout(() => setView(true), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}
            {success && <div className="text-green-600 bg-green-50 p-3 rounded-lg text-center">{success}</div>}
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">I am a...</label>
                <select value={role} onChange={e => setRole(e.target.value as any)} className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition">
                    <option value="fisherman">Fisherman</option>
                    <option value="buyer">Buyer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors">
                 {isLoading ? 'Registering...' : <><UserPlus size={20} /><span>Create Account</span></>}
            </button>
        </form>
    );
};

