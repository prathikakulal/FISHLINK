// // // // import { useState } from 'react'
// // // // import reactLogo from './assets/react.svg'
// // // // import viteLogo from '/vite.svg'
// // // // import './App.css'

// // // // function App() {
// // // //   const [count, setCount] = useState(0)

// // // //   return (
// // // //     <>
// // // //       <div>
// // // //         <a href="https://vite.dev" target="_blank">
// // // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // // //         </a>
// // // //         <a href="https://react.dev" target="_blank">
// // // //           <img src={reactLogo} className="logo react" alt="React logo" />
// // // //         </a>
// // // //       </div>
// // // //       <h1>Vite + React</h1>
// // // //       <div className="card">
// // // //         <button onClick={() => setCount((count) => count + 1)}>
// // // //           count is {count}
// // // //         </button>
// // // //         <p>
// // // //           Edit <code>src/App.tsx</code> and save to test HMR
// // // //         </p>
// // // //       </div>
// // // //       <p className="read-the-docs">
// // // //         Click on the Vite and React logos to learn more
// // // //       </p>
// // // //     </>
// // // //   )
// // // // }

// // // // export default App


// // // // import { FishermanDashboard } from './pages/FishermanDashboard';

// // // // function App() {
// // // //   return <FishermanDashboard />;
// // // // }

// // // // export default App;

// // // import React from 'react';
// // // import FishermanDashboard from './pages/FishermanDashboard';

// // // const App: React.FC = () => {
// // //   return (
// // //     <div className="min-h-screen bg-gray-100 text-gray-800">
// // //       <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold shadow-md">
// // //         Fisherman Dashboard
// // //       </header>
// // //       <main className="p-6">
// // //         <FishermanDashboard />
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default App;



// // // src/App.tsx
// // import { FishermanDashboard } from './pages/FishermanDashboard';

// // function App() {
// //   return (
// //     <FishermanDashboard />
// //   );
// // }

// // export default App;



// // src/App.tsx
// import React from 'react';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { FishermanDashboard } from './pages/FishermanDashboard';
// import { BuyerDashboard } from './pages/BuyerDashboard';
// import { AdminDashboard } from './pages/AdminDashboard';
// import { AuthPage } from './pages/AuthPage';

// const AppContent = () => {
//     const { user, logout } = useAuth();

//     if (!user) {
//         return <AuthPage />;
//     }

//     switch (user.role) {
//         case 'fisherman':
//             return <FishermanDashboard user={user} onLogout={logout} />;
//         case 'buyer':
//             return <BuyerDashboard user={user} onLogout={logout} />;
//         case 'admin':
//             return <AdminDashboard user={user} onLogout={logout} />;
//         default:
//             return <AuthPage />;
//     }
// };

// function App() {
//     return (
//         <AuthProvider>
//             <AppContent />
//         </AuthProvider>
//     );
// }

// export default App;

























// src/App.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FishermanDashboard } from './pages/FishermanDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';

const AppContent = () => {
    const { user, logout } = useAuth();
    const [isAuthVisible, setAuthVisible] = useState(false);

    // If a user is logged in, show their dashboard
    if (user) {
        switch (user.role) {
            case 'fisherman':
                return <FishermanDashboard user={user} onLogout={logout} />;
            case 'buyer':
                return <BuyerDashboard user={user} onLogout={logout} />;
            case 'admin':
                return <AdminDashboard user={user} onLogout={logout} />;
            default:
                // This case should ideally not be reached if roles are handled correctly
                return <HomePage onLoginClick={() => setAuthVisible(true)} />;
        }
    }

    // If no user is logged in, show the homepage
    return (
        <div>
            <HomePage onLoginClick={() => setAuthVisible(true)} />
            <AnimatePresence>
                {isAuthVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                        onClick={() => setAuthVisible(false)} // Close on backdrop click
                    >
                        <div onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside the modal */}
                           <AuthPage />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
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