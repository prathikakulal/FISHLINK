

// // // src/pages/FishermanDashboard.tsx

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';
// // import axios from 'axios';

// // // Import components from their correct locations
// // import { Toast } from '../components/Toast';
// // import { WeatherWidget } from '../components/WeatherWidget';
// // import { AddCatchForm } from '../components/AddCatchForm';
// // import { MyListings } from '../components/MyListings';
// // import { OrdersReceived } from '../components/OrdersReceived';
// // import { AnalyticsSection } from '../components/AnalyticsSection';
// // import { useAuth } from '../context/AuthContext'; // Import useAuth to get user info

// // // --- TypeScript Definitions for Props ---
// // interface User {
// //     id: string;
// //     name: string;
// //     role: string;
// // }

// // interface FishermanDashboardProps {
// //     user: User;
// //     onLogout: () => void;
// // }

// // export const FishermanDashboard: React.FC<FishermanDashboardProps> = ({ user, onLogout }) => {
// //     const [activeSection, setActiveSection] = useState('add-catch');
// //     const [listings, setListings] = useState([]); // Start with an empty array for listings
// //     const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

// //     // --- Data Fetching ---
// //     // This useEffect hook runs once when the component mounts
// //     useEffect(() => {
// //         const fetchListings = async () => {
// //             try {
// //                 // Fetch all products from your backend API
// //                 const response = await axios.get('http://localhost:5000/api/products');
// //                 setListings(response.data);
// //             } catch (error) {
// //                 console.error("Failed to fetch listings:", error);
// //                 // Handle error, maybe show a toast
// //             }
// //         };
// //         fetchListings();
// //     }, []); // The empty dependency array means this runs only once on mount

// //     // This function is passed to AddCatchForm. When a new catch is successfully saved,
// //     // it adds the new catch to the top of the listings array in the UI instantly.
// //     const handleAddCatch = (newCatch: any) => {
// //         setListings(prevListings => [newCatch, ...prevListings]);
// //         setToast({ message: `${newCatch.fishName} has been successfully added to your listings.`, type: 'success' });
// //         setActiveSection('my-listings'); // Switch view to show the new listing
// //     };

// //     const sections: { [key: string]: React.ReactNode } = {
// //         'add-catch': <AddCatchForm onAddCatch={handleAddCatch} />,
// //         'my-listings': <MyListings listings={listings} setListings={setListings} />,
// //         'orders-received': <OrdersReceived />, // These can be implemented next
// //         'analytics': <AnalyticsSection />,
// //         'chat': <div className="text-center p-8 bg-white rounded-lg shadow-lg">Chat feature coming soon!</div>
// //     };

// //     const NavItem = ({ sectionId, icon, label }: { sectionId: string; icon: React.ReactNode; label: string }) => (
// //         <button 
// //             onClick={() => setActiveSection(sectionId)} 
// //             className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
// //         >
// //             {icon}
// //             <span className="font-medium">{label}</span>
// //         </button>
// //     );

// //     return (
// //         <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
// //             <AnimatePresence>
// //                 {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// //             </AnimatePresence>

// //             <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0">
// //                 <h1 className="text-2xl font-bold text-blue-700 mb-8">🐟 FishLink</h1>
// //                 <nav className="space-y-3">
// //                     <NavItem sectionId="add-catch" icon={<PlusCircle size={20} />} label="Add Catch" />
// //                     <NavItem sectionId="my-listings" icon={<LayoutGrid size={20} />} label="My Listings" />
// //                     <NavItem sectionId="orders-received" icon={<ShoppingCart size={20} />} label="Orders Received" />
// //                     <NavItem sectionId="analytics" icon={<BarChart2 size={20} />} label="Analytics" />
// //                     <NavItem sectionId="chat" icon={<MessageSquare size={20} />} label="Chat" />
// //                 </nav>
// //                 <div className="mt-auto pt-8">
// //                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
// //                         <div className="flex">
// //                            <div className="flex-shrink-0"><CheckCircle className="h-5 w-5 text-green-400" /></div>
// //                            <div className="ml-3"><p className="text-sm text-green-700">You're rated 4.7 ★ – Great job!</p></div>
// //                         </div>
// //                      </div>
// //                 </div>
// //             </aside>

// //             <main className="flex-1 p-6 sm:p-10">
// //                 <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
// //                     <div>
// //                         <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h2>
// //                         <p className="text-gray-500 mt-1">Here's what's happening with your catches today.</p>
// //                     </div>
// //                     <button onClick={onLogout} className="flex items-center space-x-2 mt-4 sm:mt-0 text-sm font-medium text-gray-600 hover:text-red-500">
// //                         <LogOut size={18} />
// //                         <span>Logout</span>
// //                     </button>
// //                 </header>
                
// //                 <WeatherWidget />

// //                 <div className="mt-12">
// //                     <AnimatePresence mode="wait">
// //                         <motion.div
// //                             key={activeSection}
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             exit={{ opacity: 0, y: -20 }}
// //                             transition={{ duration: 0.3 }}
// //                         >
// //                             {sections[activeSection]}
// //                         </motion.div>
// //                     </AnimatePresence>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // };







// // src/pages/FishermanDashboard.tsx

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';
// // import axios from 'axios';

// // // Import components from their correct locations
// // import { Toast } from '../components/Toast';
// // import { WeatherWidget } from '../components/WeatherWidget';
// // import { AddCatchForm } from '../components/AddCatchForm';
// // import { MyListings } from '../components/MyListings';
// // import { OrdersReceived } from '../components/OrdersReceived';
// // import { AnalyticsSection } from '../components/AnalyticsSection';

// // // --- TypeScript Definitions ---
// // interface User {
// //     id: string;
// //     name: string;
// //     role: string;
// // }

// // interface FishermanDashboardProps {
// //     user: User;
// //     onLogout: () => void;
// // }

// // export const FishermanDashboard: React.FC<FishermanDashboardProps> = ({ user, onLogout }) => {
// //     const [activeSection, setActiveSection] = useState('add-catch');
// //     const [listings, setListings] = useState([]); // This will hold the products from your database
// //     const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

// //     // --- Data Fetching ---
// //     // This hook runs once when the component loads to get all saved listings
// //     useEffect(() => {
// //         const fetchListings = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:5000/api/products');
// //                 setListings(response.data);
// //             } catch (error) {
// //                 console.error("Failed to fetch listings:", error);
// //             }
// //         };
// //         fetchListings();
// //     }, []); // The empty array ensures this runs only once on page load

// //     // This function is passed to AddCatchForm. When a new catch is saved,
// //     // it adds the new data to the top of the list for an instant UI update.
// //     const handleAddCatch = (newCatch: any) => {
// //         setListings(prevListings => [newCatch, ...prevListings]);
// //         setToast({ message: `${newCatch.fishName} has been successfully added.`, type: 'success' });
// //         setActiveSection('my-listings'); // Automatically switch to "My Listings" view
// //     };

// //     const sections: { [key: string]: React.ReactNode } = {
// //         'add-catch': <AddCatchForm onAddCatch={handleAddCatch} />,
// //         'my-listings': <MyListings listings={listings} />,
// //         // These sections can be fully implemented next
// //         'orders-received': <OrdersReceived orders={[]} />, 
// //         'analytics': <AnalyticsSection salesData={[]} fishSalesData={[]} />,
// //         'chat': <div className="text-center p-8 bg-white rounded-lg shadow-lg">Chat feature coming soon!</div>
// //     };

// //     const NavItem = ({ sectionId, icon, label }: { sectionId: string; icon: React.ReactNode; label: string }) => (
// //         <button 
// //             onClick={() => setActiveSection(sectionId)} 
// //             className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
// //         >
// //             {icon}
// //             <span className="font-medium">{label}</span>
// //         </button>
// //     );

// //     return (
// //         <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
// //             <AnimatePresence>
// //                 {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// //             </AnimatePresence>

// //             <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0">
// //                 <h1 className="text-2xl font-bold text-blue-700 mb-8">🐟 FishLink</h1>
// //                 <nav className="space-y-3">
// //                     <NavItem sectionId="add-catch" icon={<PlusCircle size={20} />} label="Add Catch" />
// //                     <NavItem sectionId="my-listings" icon={<LayoutGrid size={20} />} label="My Listings" />
// //                     <NavItem sectionId="orders-received" icon={<ShoppingCart size={20} />} label="Orders Received" />
// //                     <NavItem sectionId="analytics" icon={<BarChart2 size={20} />} label="Analytics" />
// //                     <NavItem sectionId="chat" icon={<MessageSquare size={20} />} label="Chat" />
// //                 </nav>
// //                 <div className="mt-auto pt-8">
// //                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
// //                         <div className="flex">
// //                            <div className="flex-shrink-0"><CheckCircle className="h-5 w-5 text-green-400" /></div>
// //                            <div className="ml-3"><p className="text-sm text-green-700">You're rated 4.7 ★ – Great job!</p></div>
// //                         </div>
// //                      </div>
// //                 </div>
// //             </aside>

// //             <main className="flex-1 p-6 sm:p-10">
// //                 <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
// //                     <div>
// //                         <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h2>
// //                         <p className="text-gray-500 mt-1">Here's what's happening with your catches today.</p>
// //                     </div>
// //                     <button onClick={onLogout} className="flex items-center space-x-2 mt-4 sm:mt-0 text-sm font-medium text-gray-600 hover:text-red-500">
// //                         <LogOut size={18} />
// //                         <span>Logout</span>
// //                     </button>
// //                 </header>
                
// //                 <WeatherWidget />

// //                 <div className="mt-12">
// //                     <AnimatePresence mode="wait">
// //                         <motion.div
// //                             key={activeSection}
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             exit={{ opacity: 0, y: -20 }}
// //                             transition={{ duration: 0.3 }}
// //                         >
// //                             {sections[activeSection]}
// //                         </motion.div>
// //                     </AnimatePresence>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // };









// // src/pages/FishermanDashboard.tsx

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';
// import axios from 'axios';

// // Import components from their correct locations
// import { Toast } from '../components/Toast';
// import { WeatherWidget } from '../components/WeatherWidget';
// import { AddCatchForm } from '../components/AddCatchForm';
// import { MyListings } from '../components/MyListings';
// import { OrdersReceived } from '../components/OrdersReceived';
// import { AnalyticsSection } from '../components/AnalyticsSection';

// // --- TypeScript Definitions ---

// // ✅ 1. Define the shape of a single Product
// interface Product {
//     _id: string;
//     fishName: string;
//     price: number;
//     quantity: number;
//     freshness: string;
//     imageUrl: string;
//     description: string;
// }

// // ✅ 2. Update the User interface to include the 'id'
// interface User {
//     id: string;
//     name: string;
//     role: string;
// }

// interface FishermanDashboardProps {
//     user: User;
//     onLogout: () => void;
// }

// export const FishermanDashboard: React.FC<FishermanDashboardProps> = ({ user, onLogout }) => {
//     const [activeSection, setActiveSection] = useState('add-catch');
//     // ✅ 3. Give the 'listings' state a specific type
//     const [listings, setListings] = useState<Product[]>([]); 
//     const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

//     // --- Data Fetching ---
//     // This hook now fetches the user's specific listings, not all products.
//     useEffect(() => {
//         const fetchListings = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     console.error("Authentication token not found.");
//                     return;
//                 }
//                 // Fetch from the secure 'my-listings' endpoint
//                 const response = await axios.get('http://localhost:5000/api/products/my-listings', {
//                     headers: { 'auth-token': token }
//                 });
//                 setListings(response.data);
//             } catch (error) {
//                 console.error("Failed to fetch listings:", error);
//             }
//         };
//         fetchListings();
//     }, []);

//     // ✅ 4. Define the type for the new catch being added
//     const handleAddCatch = (newCatch: Product) => {
//         setListings(prevListings => [newCatch, ...prevListings]);
//         setToast({ message: `${newCatch.fishName} has been successfully added.`, type: 'success' });
//         setActiveSection('my-listings');
//     };

//     // The components are now passed the correct props
//     const sections: { [key: string]: React.ReactNode } = {
//         'add-catch': <AddCatchForm onCatchAdded={handleAddCatch} />,
//         'my-listings': <MyListings listings={listings} />,
//         'orders-received': <OrdersReceived orders={[]} />, 
//         'analytics': <AnalyticsSection salesData={[]} fishSalesData={[]} />,
//         'chat': <div className="text-center p-8 bg-white rounded-lg shadow-lg">Chat feature coming soon!</div>
//     };

//     const NavItem = ({ sectionId, icon, label }: { sectionId: string; icon: React.ReactNode; label: string }) => (
//         <button 
//             onClick={() => setActiveSection(sectionId)} 
//             className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
//         >
//             {icon}
//             <span className="font-medium">{label}</span>
//         </button>
//     );

//     return (
//         <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
//             <AnimatePresence>
//                 {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//             </AnimatePresence>

//             <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0">
//                 <h1 className="text-2xl font-bold text-blue-700 mb-8">🐟 FishLink</h1>
//                 <nav className="space-y-3">
//                     <NavItem sectionId="add-catch" icon={<PlusCircle size={20} />} label="Add Catch" />
//                     <NavItem sectionId="my-listings" icon={<LayoutGrid size={20} />} label="My Listings" />
//                     <NavItem sectionId="orders-received" icon={<ShoppingCart size={20} />} label="Orders Received" />
//                     <NavItem sectionId="analytics" icon={<BarChart2 size={20} />} label="Analytics" />
//                     <NavItem sectionId="chat" icon={<MessageSquare size={20} />} label="Chat" />
//                 </nav>
//                 <div className="mt-auto pt-8">
//                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
//                          <div className="flex">
//                             <div className="flex-shrink-0"><CheckCircle className="h-5 w-5 text-green-400" /></div>
//                             <div className="ml-3"><p className="text-sm text-green-700">You're rated 4.7 ★ – Great job!</p></div>
//                          </div>
//                      </div>
//                 </div>
//             </aside>

//             <main className="flex-1 p-6 sm:p-10">
//                 <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//                     <div>
//                         <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h2>
//                         <p className="text-gray-500 mt-1">Here's what's happening with your catches today.</p>
//                     </div>
//                     <button onClick={onLogout} className="flex items-center space-x-2 mt-4 sm:mt-0 text-sm font-medium text-gray-600 hover:text-red-500">
//                         <LogOut size={18} />
//                         <span>Logout</span>
//                     </button>
//                 </header>
                
//                 <WeatherWidget />

//                 <div className="mt-12">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={activeSection}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             {sections[activeSection]}
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>
//             </main>
//         </div>
//     );
// };












// src/pages/FishermanDashboard.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';

// Import components from their correct locations
import { Toast } from '../components/Toast';
import { WeatherWidget } from '../components/WeatherWidget';
import { AddCatchForm } from '../components/AddCatchForm';
import { MyListings } from '../components/MyListings';
import { OrdersReceived } from '../components/OrdersReceived';
import { AnalyticsSection } from '../components/AnalyticsSection';

// --- TypeScript Definitions ---

// Define the shape of a single Product
interface Product {
    _id: string;
    fishName: string;
    price: number;
    quantity: number;
    freshness: string;
    imageUrl: string;
    description: string;
}

// Update the User interface to include the 'id'
interface User {
    id: string;
    name: string;
    role: string;
}

interface FishermanDashboardProps {
    user: User;
    onLogout: () => void;
}

export const FishermanDashboard: React.FC<FishermanDashboardProps> = ({ user, onLogout }) => {
    const [activeSection, setActiveSection] = useState('add-catch');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    // ✅ 1. State to trigger refetching in MyListings
    const [updateTrigger, setUpdateTrigger] = useState(0);

    // This function is passed to AddCatchForm. When a new catch is saved,
    // it updates the trigger state, which will cause MyListings to refetch its data.
    const handleCatchAdded = () => {
        setToast({ message: `Your new catch has been successfully added.`, type: 'success' });
        setActiveSection('my-listings'); // Switch view to "My Listings"
        setUpdateTrigger(prev => prev + 1); // Increment trigger to force useEffect in MyListings
    };

    // The components are now passed the correct props
    const sections: { [key: string]: React.ReactNode } = {
        // ✅ 2. Pass the correct prop 'onCatchAdded'
        'add-catch': <AddCatchForm onCatchAdded={handleCatchAdded} />,
        // ✅ 3. Pass the 'updateTrigger' prop to MyListings
        'my-listings': <MyListings key={updateTrigger} />,
        'orders-received': <OrdersReceived orders={[]} />, 
        'analytics': <AnalyticsSection salesData={[]} fishSalesData={[]} />,
        'chat': <div className="text-center p-8 bg-white rounded-lg shadow-lg">Chat feature coming soon!</div>
    };

    const NavItem = ({ sectionId, icon, label }: { sectionId: string; icon: React.ReactNode; label: string }) => (
        <button 
            onClick={() => setActiveSection(sectionId)} 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
            <AnimatePresence>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </AnimatePresence>

            <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-700 mb-8">🐟 FishLink</h1>
                <nav className="space-y-3">
                    <NavItem sectionId="add-catch" icon={<PlusCircle size={20} />} label="Add Catch" />
                    <NavItem sectionId="my-listings" icon={<LayoutGrid size={20} />} label="My Listings" />
                    <NavItem sectionId="orders-received" icon={<ShoppingCart size={20} />} label="Orders Received" />
                    <NavItem sectionId="analytics" icon={<BarChart2 size={20} />} label="Analytics" />
                    <NavItem sectionId="chat" icon={<MessageSquare size={20} />} label="Chat" />
                </nav>
                <div className="mt-auto pt-8">
                     <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                         <div className="flex">
                            <div className="flex-shrink-0"><CheckCircle className="h-5 w-5 text-green-400" /></div>
                            <div className="ml-3"><p className="text-sm text-green-700">You're rated 4.7 ★ – Great job!</p></div>
                         </div>
                     </div>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-10">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h2>
                        <p className="text-gray-500 mt-1">Here's what's happening with your catches today.</p>
                    </div>
                    <button onClick={onLogout} className="flex items-center space-x-2 mt-4 sm:mt-0 text-sm font-medium text-gray-600 hover:text-red-500">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </header>
                
                <WeatherWidget />

                <div className="mt-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {sections[activeSection]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
