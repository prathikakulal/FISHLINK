// // src/pages/AdminDashboard.tsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Users, LayoutGrid, ShieldCheck, BarChart2, LogOut } from 'lucide-react';

// // Placeholder components for Admin sections
// const ManageUsers = () => <div className="bg-white p-8 rounded-2xl shadow-lg"><h3 className="text-2xl font-bold">Manage Users</h3><p className="mt-4 text-gray-600">A table of all users would appear here...</p></div>;
// const AllListings = () => <div className="bg-white p-8 rounded-2xl shadow-lg"><h3 className="text-2xl font-bold">All Marketplace Listings</h3><p className="mt-4 text-gray-600">A view of all active listings would be here...</p></div>;
// const Disputes = () => <div className="bg-white p-8 rounded-2xl shadow-lg"><h3 className="text-2xl font-bold">Dispute Resolution</h3><p className="mt-4 text-gray-600">A queue of user disputes would be managed here...</p></div>;

// export const AdminDashboard = () => {
//     const [activeSection, setActiveSection] = useState('users');

//     const sections = {
//         'users': <ManageUsers />,
//         'listings': <AllListings />,
//         'disputes': <Disputes />,
//     };

//     const NavItem = ({ sectionId, icon, label }) => (
//         <button onClick={() => setActiveSection(sectionId)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
//             {icon}
//             <span className="font-medium">{label}</span>
//         </button>
//     );

//     return (
//         <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
//             <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0">
//                 <h1 className="text-2xl font-bold text-blue-700 mb-8">🛡️ Admin Panel</h1>
//                 <nav className="space-y-3">
//                     <NavItem sectionId="users" icon={<Users size={20} />} label="Manage Users" />
//                     <NavItem sectionId="listings" icon={<LayoutGrid size={20} />} label="All Listings" />
//                     <NavItem sectionId="disputes" icon={<ShieldCheck size={20} />} label="Disputes" />
//                 </nav>
//             </aside>

//             <main className="flex-1 p-6 sm:p-10">
//                  <header className="flex justify-between items-center mb-8">
//                     <h2 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h2>
//                      <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-500">
//                         <LogOut size={18} />
//                         <span>Logout</span>
//                     </button>
//                 </header>
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={activeSection}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         {sections[activeSection]}
//                     </motion.div>
//                 </AnimatePresence>
//             </main>
//         </div>
//     );
// };


















// src/pages/AdminDashboard.tsx
import React from 'react';
import { Users, LayoutGrid, ShieldCheck, LogOut } from 'lucide-react';

// --- TypeScript Definitions for Props ---
interface User {
    name: string;
    role: string;
}

interface AdminDashboardProps {
    user: User;
    onLogout: () => void;
}

// The component now correctly accepts user and onLogout props
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
            <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-700 mb-8">🛡️ Admin Panel</h1>
                <nav className="space-y-3">
                    {/* You can add NavItem components here if needed */}
                    <button className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left bg-blue-600 text-white shadow-md">
                        <Users size={20} />
                        <span className="font-medium">Manage Users</span>
                    </button>
                     <button className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left text-gray-600 hover:bg-gray-200">
                        <LayoutGrid size={20} />
                        <span className="font-medium">All Listings</span>
                    </button>
                     <button className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left text-gray-600 hover:bg-gray-200">
                        <ShieldCheck size={20} />
                        <span className="font-medium">Disputes</span>
                    </button>
                </nav>
            </aside>
            <main className="flex-1 p-6 sm:p-10">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'Admin'}!</h2>
                        <p className="text-gray-500 mt-1">This is the central control panel.</p>
                    </div>
                    <button onClick={onLogout} className="flex items-center space-x-2 mt-4 sm:mt-0 text-sm font-medium text-gray-600 hover:text-red-500">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </header>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold">Manage Users</h3>
                    <p className="mt-4 text-gray-600">A table of all users would appear here...</p>
                </div>
            </main>
        </div>
    );
};
