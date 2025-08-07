








// src/App.tsx
import React from 'react';
// ✅ 1. Import useNavigate to handle navigation programmatically
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FishermanDashboard } from './pages/FishermanDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';

// A wrapper for routes that should only be accessible when logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    // If there is no user, redirect them to the login page
    return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
    // ✅ 2. Get both user and logout from the context
    const { user, logout } = useAuth();
    // ✅ 3. Initialize the navigate function
    const navigate = useNavigate();

    return (
        <Routes>
            {/* Public Routes */}
            {/* ✅ 4. Pass the required onLoginClick prop to HomePage */}
            <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <HomePage onLoginClick={() => navigate('/login')} />} />
            <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/" />} />

            {/* Protected Fisherman Route */}
            <Route 
                path="/fisherman-dashboard" 
                element={
                    <ProtectedRoute>
                        {/* ✅ 5. Pass the required user and onLogout props to the dashboard */}
                        <FishermanDashboard user={user!} onLogout={logout} />
                    </ProtectedRoute>
                } 
            />

            {/* Protected Buyer Route */}
            <Route 
                path="/buyer-dashboard" 
                element={
                    <ProtectedRoute>
                        <BuyerDashboard user={user!} onLogout={logout} />
                    </ProtectedRoute>
                } 
            />

            {/* Protected Admin Route */}
            <Route 
                path="/admin-dashboard" 
                element={
                    <ProtectedRoute>
                        <AdminDashboard user={user!} onLogout={logout} />
                    </ProtectedRoute>
                } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
