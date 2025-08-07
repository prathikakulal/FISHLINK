// // // // src/context/AuthContext.tsx
// // // import React, { createContext, useState, useContext, useEffect } from 'react';

// // // // Define the shape of the user object and the context
// // // interface User {
// // //     name: string;
// // //     role: 'fisherman' | 'buyer' | 'admin';
// // // }

// // // interface AuthContextType {
// // //     user: User | null;
// // //     login: (userData: User) => void;
// // //     logout: () => void;
// // // }

// // // // Create the context with a default value of null
// // // const AuthContext = createContext<AuthContextType | null>(null);

// // // // Create the AuthProvider component
// // // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// // //     const [user, setUser] = useState<User | null>(null);

// // //     // On initial load, check if user data exists in localStorage
// // //     useEffect(() => {
// // //         const storedUser = localStorage.getItem('fishlink-user');
// // //         if (storedUser) {
// // //             setUser(JSON.parse(storedUser));
// // //         }
// // //     }, []);

// // //     const login = (userData: User) => {
// // //         setUser(userData);
// // //         // Save user data to localStorage to persist login across page reloads
// // //         localStorage.setItem('fishlink-user', JSON.stringify(userData));
// // //     };

// // //     const logout = () => {
// // //         setUser(null);
// // //         // Remove user data from localStorage
// // //         localStorage.removeItem('fishlink-user');
// // //     };

// // //     return (
// // //         <AuthContext.Provider value={{ user, login, logout }}>
// // //             {children}
// // //         </AuthContext.Provider>
// // //     );
// // // };

// // // // Create a custom hook to easily use the auth context in other components
// // // export const useAuth = () => {
// // //     const context = useContext(AuthContext);
// // //     if (!context) {
// // //         throw new Error('useAuth must be used within an AuthProvider');
// // //     }
// // //     return context;
// // // };











// // // src/context/AuthContext.tsx
// // import React, { createContext, useState, useContext, useEffect } from 'react';

// // // Define the shape of the user object and the context
// // interface User {
// //     name: string;
// //     role: 'fisherman' | 'buyer' | 'admin';
// // }

// // interface AuthContextType {
// //     user: User | null;
// //     token: string | null; // The context will now also hold the token
// //     login: (userData: User, token: string) => void;
// //     logout: () => void;
// // }

// // // Create the context
// // const AuthContext = createContext<AuthContextType | null>(null);

// // // Create the AuthProvider component
// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //     const [user, setUser] = useState<User | null>(null);
// //     const [token, setToken] = useState<string | null>(null);

// //     // On initial load, check for both user and token in localStorage
// //     useEffect(() => {
// //         const storedUser = localStorage.getItem('fishlink-user');
// //         const storedToken = localStorage.getItem('token');

// //         if (storedUser && storedToken) {
// //             setUser(JSON.parse(storedUser));
// //             setToken(storedToken);
// //         }
// //     }, []);

// //     // The login function now accepts and stores both user data and the token
// //     const login = (userData: User, token: string) => {
// //         setUser(userData);
// //         setToken(token);
// //         localStorage.setItem('fishlink-user', JSON.stringify(userData));
// //         localStorage.setItem('token', token);
// //     };

// //     // The logout function now clears both user data and the token
// //     const logout = () => {
// //         setUser(null);
// //         setToken(null);
// //         localStorage.removeItem('fishlink-user');
// //         localStorage.removeItem('token');
// //     };

// //     return (
// //         <AuthContext.Provider value={{ user, token, login, logout }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// // // Custom hook to use the auth context
// // export const useAuth = () => {
// //     const context = useContext(AuthContext);
// //     if (!context) {
// //         throw new Error('useAuth must be used within an AuthProvider');
// //     }
// //     return context;
// // };










// // src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Define the shape of the user object and the context
// interface User {
//     name: string;
//     role: 'fisherman' | 'buyer' | 'admin';
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean; // Add a loading state
//     login: (userData: User, token: string) => void;
//     logout: () => void;
// }

// // Create the context
// const AuthContext = createContext<AuthContextType | null>(null);

// // Create the AuthProvider component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true); // Start in a loading state
//     const navigate = useNavigate();

//     // This effect runs only once on initial app load
//     useEffect(() => {
//         try {
//             const storedUser = localStorage.getItem('fishlink-user');
//             const storedToken = localStorage.getItem('token');

//             if (storedUser && storedToken) {
//                 setUser(JSON.parse(storedUser));
//                 setToken(storedToken);
//             }
//         } catch (error) {
//             console.error("Failed to parse auth data from localStorage", error);
//             // Clear potentially corrupted data
//             localStorage.removeItem('fishlink-user');
//             localStorage.removeItem('token');
//         } finally {
//             // Set loading to false after checking localStorage
//             setLoading(false);
//         }
//     }, []);

//     const login = (userData: User, token: string) => {
//         setUser(userData);
//         setToken(token);
//         localStorage.setItem('fishlink-user', JSON.stringify(userData));
//         localStorage.setItem('token', token);
//     };

//     const logout = () => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('fishlink-user');
//         localStorage.removeItem('token');
//         // Redirect to homepage on logout for a better user experience
//         navigate('/');
//     };

//     return (
//         <AuthContext.Provider value={{ user, token, loading, login, logout }}>
//             {/* Don't render children until the initial check is complete */}
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };





// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
// ✅ 1. REMOVED useNavigate from here as it cannot be used in this component.
// The redirection logic will be handled in the components that call logout().

// Define the shape of the user object and the context
interface User {
    id: string;
    name: string;
    role: 'fisherman' | 'buyer' | 'admin';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // This effect runs only once on initial app load
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('fishlink-user');
            const storedToken = localStorage.getItem('token');

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Failed to parse auth data from localStorage", error);
            localStorage.removeItem('fishlink-user');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (userData: User, token: string) => {
        if (!userData.role) {
            throw new Error("Login: user role missing");
        }
        setUser(userData);
        setToken(token);
        localStorage.setItem('fishlink-user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('fishlink-user');
        localStorage.removeItem('token');
        // ✅ 2. The navigation will now be handled by the component that calls logout.
        // For example, in your dashboard: const navigate = useNavigate(); logout(); navigate('/');
    };

    // return (
    //     <AuthContext.Provider value={{ user, token, loading, login, logout }}>
    //         {!loading && children}
    //     </AuthContext.Provider>
    // );

    return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
        {children} {/* <-- Temporarily render children unconditionally */}
    </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
