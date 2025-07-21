// // // // src/pages/AuthPage.tsx
// // // import React, { useState } from 'react';
// // // import { useAuth } from '../context/AuthContext';

// // // // A simple login form component
// // // const LoginForm = ({ onLogin }) => {
// // //     const [name, setName] = useState('');
// // //     const [role, setRole] = useState<'fisherman' | 'buyer' | 'admin'>('fisherman');

// // //     const handleSubmit = (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!name) {
// // //             alert('Please enter your name.');
// // //             return;
// // //         }
// // //         // In a real app, you would call a backend API here.
// // //         // For now, we just call the onLogin function with the mock user data.
// // //         onLogin({ name, role });
// // //     };

// // //     return (
// // //         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
// // //             <h1 className="text-2xl font-bold text-center text-gray-800">Login to FishLink</h1>
// // //             <form onSubmit={handleSubmit} className="space-y-6">
// // //                 <div>
// // //                     <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
// // //                     <input
// // //                         id="name"
// // //                         type="text"
// // //                         value={name}
// // //                         onChange={(e) => setName(e.target.value)}
// // //                         className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none"
// // //                         placeholder="e.g., Ramesh Kumar"
// // //                     />
// // //                 </div>
// // //                 <div>
// // //                     <label htmlFor="role" className="text-sm font-medium text-gray-700">Select Your Role</label>
// // //                     <select
// // //                         id="role"
// // //                         value={role}
// // //                         onChange={(e) => setRole(e.target.value as any)}
// // //                         className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none"
// // //                     >
// // //                         <option value="fisherman">Fisherman</option>
// // //                         <option value="buyer">Buyer</option>
// // //                         <option value="admin">Admin</option>
// // //                     </select>
// // //                 </div>
// // //                 <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
// // //                     Login
// // //                 </button>
// // //             </form>
// // //         </div>
// // //     );
// // // };

// // // export const AuthPage = () => {
// // //     const { login } = useAuth();

// // //     return (
// // //         <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // //             <LoginForm onLogin={login} />
// // //         </div>
// // //     );
// // // };















// // // src/pages/AuthPage.tsx
// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useAuth } from '../context/AuthContext';
// // import { LogIn, UserPlus } from 'lucide-react';

// // // --- Main Auth Page Component ---
// // export const AuthPage = () => {
// //     const [isLoginView, setIsLoginView] = useState(true);
// //     const { login } = useAuth();

// //     const handleSubmit = (e: React.FormEvent, role: 'fisherman' | 'buyer' | 'admin') => {
// //         e.preventDefault();
// //         const form = e.target as HTMLFormElement;
// //         const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        
// //         if (!nameInput || !nameInput.value) {
// //             alert('Please enter your name.');
// //             return;
// //         }
        
// //         // Simulate a successful login/registration
// //         login({ name: nameInput.value, role });
// //     };

// //     return (
// //         <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
// //             {/* Left Panel: Welcome Message & Image */}
// //             <div className="hidden lg:block w-1/2 bg-cover bg-center p-12 text-white" style={{ backgroundImage: "url('https://placehold.co/600x800/1e3a8a/ffffff?text=Welcome!')" }}>
// //                 <h2 className="text-3xl font-bold">Welcome to FishLink</h2>
// //                 <p className="mt-4 text-blue-200">The future of fresh seafood is here. Join our community to connect directly with fishermen and buyers.</p>
// //             </div>

// //             {/* Right Panel: Form */}
// //             <div className="w-full lg:w-1/2 p-8 md:p-12">
// //                 <h1 className="text-3xl font-bold text-blue-700 mb-4">🐟 FishLink</h1>
// //                 <div className="flex border-b mb-6">
// //                     <button 
// //                         onClick={() => setIsLoginView(true)}
// //                         className={`py-2 px-4 font-semibold transition-colors ${isLoginView ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
// //                     >
// //                         Login
// //                     </button>
// //                     <button 
// //                         onClick={() => setIsLoginView(false)}
// //                         className={`py-2 px-4 font-semibold transition-colors ${!isLoginView ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
// //                     >
// //                         Register
// //                     </button>
// //                 </div>

// //                 <AnimatePresence mode="wait">
// //                     <motion.div
// //                         key={isLoginView ? 'login' : 'register'}
// //                         initial={{ opacity: 0, x: 50 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         exit={{ opacity: 0, x: -50 }}
// //                         transition={{ duration: 0.3 }}
// //                     >
// //                         {isLoginView ? <LoginForm onSubmit={handleSubmit} /> : <RegisterForm onSubmit={handleSubmit} />}
// //                     </motion.div>
// //                 </AnimatePresence>
// //             </div>
// //         </div>
// //     );
// // };

// // // --- Login Form Component ---
// // const LoginForm = ({ onSubmit }) => {
// //     const [role, setRole] = useState<'fisherman' | 'buyer' | 'admin'>('fisherman');

// //     return (
// //         <div>
// //             <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
// //             <p className="text-gray-500 mt-2">Please select your role and enter your name to log in.</p>
// //             <form onSubmit={(e) => onSubmit(e, role)} className="mt-8 space-y-6">
// //                 <div>
// //                     <label htmlFor="login-name" className="block text-sm font-medium text-gray-700">Your Name</label>
// //                     <input id="login-name" name="name" type="text" required className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="e.g., Ramesh Kumar" />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="login-role" className="block text-sm font-medium text-gray-700">Login as</label>
// //                     <select id="login-role" value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none">
// //                         <option value="fisherman">Fisherman</option>
// //                         <option value="buyer">Buyer</option>
// //                         <option value="admin">Admin</option>
// //                     </select>
// //                 </div>
// //                 <button type="submit" className="w-full flex justify-center items-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
// //                     <LogIn size={20} />
// //                     <span>Login</span>
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // };

// // // --- Register Form Component ---
// // const RegisterForm = ({ onSubmit }) => {
// //     const [role, setRole] = useState<'fisherman' | 'buyer'>('fisherman');

// //     return (
// //         <div>
// //             <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
// //             <p className="text-gray-500 mt-2">Join our community to get started.</p>
// //             <form onSubmit={(e) => onSubmit(e, role)} className="mt-8 space-y-6">
// //                  <div>
// //                     <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">Your Full Name</label>
// //                     <input id="register-name" name="name" type="text" required className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="e.g., Sita Sharma" />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="register-role" className="block text-sm font-medium text-gray-700">I am a...</label>
// //                     <select id="register-role" value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none">
// //                         <option value="fisherman">Fisherman</option>
// //                         <option value="buyer">Buyer</option>
// //                     </select>
// //                 </div>
// //                 <div>
// //                     <label htmlFor="register-password"  className="block text-sm font-medium text-gray-700">Password</label>
// //                     <input id="register-password" name="password" type="password" required className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="••••••••" />
// //                 </div>
// //                 <button type="submit" className="w-full flex justify-center items-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
// //                     <UserPlus size={20} />
// //                     <span>Create Account</span>
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // };










// // src/pages/AuthPage.tsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
// import axios from 'axios'; // Make sure you have run `npm install axios`

// // --- Main Auth Page Component ---
// export const AuthPage = () => {
//     const [isLoginView, setIsLoginView] = useState(true);

//     return (
//         // Re-introducing the beautiful two-panel design
//         <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden" style={{ height: '650px' }}>
//             {/* Left Panel: Welcome Message & Image */}
//             <div 
//                 className="hidden lg:flex w-1/2 bg-cover bg-center p-12 text-white flex-col justify-between" 
//                 style={{ backgroundImage: "url('https://placehold.co/600x800/1e3a8a/ffffff?text=FishLink')" }}
//             >
//                 <div>
//                     <h2 className="text-4xl font-bold leading-tight">Welcome to the Future of Fresh Seafood.</h2>
//                     <p className="mt-4 text-blue-200 opacity-90">
//                         Join our community to connect directly with fishermen and buyers, ensuring fair prices and unmatched freshness.
//                     </p>
//                 </div>
//                 <p className="text-sm text-blue-300">© 2025 FishLink</p>
//             </div>

//             {/* Right Panel: Form */}
//             <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl font-bold text-blue-700">🐟 FishLink</h1>
//                 </div>
                
//                 {/* Login/Register Toggle */}
//                 <div className="flex justify-center bg-gray-100 rounded-full p-1 mb-8">
//                     <button 
//                         onClick={() => setIsLoginView(true)}
//                         className={`w-1/2 py-2 font-semibold rounded-full transition-colors ${isLoginView ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}
//                     >
//                         Login
//                     </button>
//                     <button 
//                         onClick={() => setIsLoginView(false)}
//                         className={`w-1/2 py-2 font-semibold rounded-full transition-colors ${!isLoginView ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}
//                     >
//                         Register
//                     </button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={isLoginView ? 'login' : 'register'}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         {isLoginView ? <LoginForm setView={setIsLoginView} /> : <RegisterForm setView={setIsLoginView} />}
//                     </motion.div>
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// // --- Helper: Error Message Component ---
// const ErrorMessage = ({ message }: { message: string }) => (
//     <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
//         <AlertCircle size={16} />
//         <span>{message}</span>
//     </div>
// );

// // --- Login Form Component ---
// const LoginForm = ({ setView }: { setView: (isLogin: boolean) => void }) => {
//     const { login } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//             login(response.data.user); 
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Login failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <ErrorMessage message={error} />}
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition-colors">
//                 {isLoading ? 'Logging in...' : <><LogIn size={20} /><span>Login</span></>}
//             </button>
//         </form>
//     );
// };

// // --- Register Form Component ---
// const RegisterForm = ({ setView }: { setView: (isLogin: boolean) => void }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState<'fisherman' | 'buyer'>('fisherman');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');
//         setIsLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
//             setSuccess(response.data.message);
//             setTimeout(() => setView(true), 2000);
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Registration failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <ErrorMessage message={error} />}
//             {success && <div className="text-green-600 bg-green-50 p-3 rounded-lg text-center">{success}</div>}
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                 <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
//             </div>
//              <div>
//                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">I am a...</label>
//                 <select value={role} onChange={e => setRole(e.target.value as any)} className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition">
//                     <option value="fisherman">Fisherman</option>
//                     <option value="buyer">Buyer</option>
//                 </select>
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors">
//                  {isLoading ? 'Registering...' : <><UserPlus size={20} /><span>Create Account</span></>}
//             </button>
//         </form>
//     );
// };











// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
import axios from 'axios'; // Make sure you have run `npm install axios`

// --- Main Auth Page Component ---
export const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        // Re-introducing the beautiful two-panel design
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

// --- Login Form Component ---
const LoginForm = ({ setView }: { setView: (isLogin: boolean) => void }) => {
    const { login } = useAuth();
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
            login(response.data.user); 
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
    // UPDATED: Added 'admin' to the possible roles for registration
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
                    {/* UPDATED: Added Admin option to the dropdown */}
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors">
                 {isLoading ? 'Registering...' : <><UserPlus size={20} /><span>Create Account</span></>}
            </button>
        </form>
    );
};

