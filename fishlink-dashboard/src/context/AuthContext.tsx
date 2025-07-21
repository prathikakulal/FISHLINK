// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of the user object and the context
interface User {
    name: string;
    role: 'fisherman' | 'buyer' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // On initial load, check if user data exists in localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('fishlink-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        // Save user data to localStorage to persist login across page reloads
        localStorage.setItem('fishlink-user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        // Remove user data from localStorage
        localStorage.removeItem('fishlink-user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to easily use the auth context in other components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};