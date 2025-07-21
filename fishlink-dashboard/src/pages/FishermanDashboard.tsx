// // // import { useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';
// // // import { AddCatchForm } from '../components/AddCatchForm';
// // // import { MyListings } from '../components/MyListings';
// // // import { OrdersReceived } from '../components/OrdersReceived';
// // // import { AnalyticsSection } from '../components/AnalyticsSection';
// // // import { WeatherWidget } from '../components/WeatherWidget';
// // // import { Toast } from '../components/Toast';

// // // export const FishermanDashboard: React.FC = () => {
// // //   const [activeSection, setActiveSection] = useState<'add-catch'|'my-listings'|'orders-received'|'analytics'>('add-catch');
// // //   const [listings, setListings] = useState<any[]>([]);
// // //   const [toast, setToast] = useState<{message:string;type:'success'|'error'}|null>(null);

// // //   const addCatch = (newCatch: any) => {
// // //     setListings([newCatch, ...listings]);
// // //     setToast({ message: `${newCatch.name} added to listings!`, type: 'success' });
// // //   };

// // //   const sections = {
// // //     'add-catch': <AddCatchForm onAddCatch={addCatch} />,
// // //     'my-listings': <MyListings listings={listings} setListings={setListings} />,
// // //     'orders-received': <OrdersReceived />,
// // //     'analytics': <AnalyticsSection />,
// // //   };

// // //   return (
// // //     <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
// // //       <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
// // //       <aside className="w-full lg:w-64 bg-white p-6">
// // //         <h1 className="text-2xl font-bold text-blue-700 mb-8">🐟 FishLink</h1>
// // //         {[
// // //           {id:'add-catch', icon:<PlusCircle size={20}/>, label:'Add Catch'},
// // //           {id:'my-listings', icon:<LayoutGrid size={20}/>, label:'My Listings'},
// // //           {id:'orders-received', icon:<ShoppingCart size={20}/>, label:'Orders Received'},
// // //           {id:'analytics', icon:<BarChart2 size={20}/>, label:'Analytics'},
// // //           {id:'chat', icon:<MessageSquare size={20}/>, label:'Chat'},
// // //         ].map(item => (
// // //           <button key={item.id} onClick={() => setActiveSection(item.id as any)}
// // //             className={`flex items-center px-4 py-3 mb-2 w-full rounded-lg ${activeSection === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
// // //             {item.icon}<span className="ml-3">{item.label}</span>
// // //           </button>
// // //         ))}
// // //         <div className="mt-auto pt-8">
// // //           <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
// // //             <div className="flex items-center">
// // //               <CheckCircle className="text-green-400 mr-3" />
// // //               <p className="text-sm text-green-700">You're rated 4.7 ★ – Great job!</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </aside>
// // //       <main className="flex-1 p-6 sm:p-10">
// // //         <header className="flex flex-col sm:flex-row justify-between items-start mb-8">
// // //           <div>
// // //             <h2 className="text-3xl font-bold text-gray-900">Welcome, Ramesh!</h2>
// // //             <p className="text-gray-500 mt-1">Here's what's happening with your catches today.</p>
// // //           </div>
// // //           <button className="flex items-center text-gray-600 hover:text-red-500">
// // //             <LogOut size={18} /><span className="ml-2">Logout</span>
// // //           </button>
// // //         </header>
// // //         <WeatherWidget />
// // //         <div className="mt-12">
// // //           <AnimatePresence mode="wait">
// // //             <motion.div
// // //               key={activeSection}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               exit={{ opacity: 0, y: -20 }}
// // //               transition={{ duration: 0.3 }}
// // //             >
// // //               {sections[activeSection]}
// // //             </motion.div>
// // //           </AnimatePresence>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // };




// // import React from 'react';
// // import AddCatchForm from '../components/AddCatchForm';
// // import AnalyticsSection from '../components/AnalyticsSection';
// // import MyListings from '../components/MyListings';
// // import OrdersReceived from '../components/OrdersReceived';
// // import WeatherWidget from '../components/WeatherWidget';

// // const FishermanDashboard = () => {
// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
// //       <AddCatchForm />
// //       <WeatherWidget />
// //       <AnalyticsSection />
// //       <MyListings />
// //       <OrdersReceived />
// //     </div>
// //   );
// // };

// // export default FishermanDashboard;





// // src/pages/FishermanDashboard.tsx
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';

// // Import components from the correct path
// import { Toast } from '../components/Toast';
// import { WeatherWidget } from '../components/WeatherWidget';
// import { AddCatchForm } from '../components/AddCatchForm';
// import { MyListings } from '../components/MyListings';
// import { OrdersReceived } from '../components/OrdersReceived';
// import { AnalyticsSection } from '../components/AnalyticsSection';

// // Mock Data (kept here for simplicity as it's only used by this page)
// const mockListingsData = [
//     { id: 1, name: 'Pomfret', quantity: 15, price: 550, freshness: 'Fresh', status: 'Available', imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Pomfret', uploadedAt: '2 hours ago' },
//     { id: 2, name: 'Kingfish', quantity: 8, price: 820, freshness: 'Fresh', status: 'Available', imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Kingfish', uploadedAt: '3 hours ago' },
//     { id: 3, name: 'Mackerel', quantity: 50, price: 300, freshness: 'Frozen', status: 'Sold', imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Mackerel', uploadedAt: '1 day ago' },
// ];
// const mockOrdersData = [
//     { id: 'ORD-001', buyerName: 'Sita Sharma', fishName: 'Pomfret', quantity: 2, totalPrice: 1100, status: 'Pending' },
//     { id: 'ORD-002', buyerName: 'Local Restaurant', fishName: 'Kingfish', quantity: 5, totalPrice: 4100, status: 'Confirmed' },
//     { id: 'ORD-003', buyerName: 'Anil Kumar', fishName: 'Mackerel', quantity: 10, totalPrice: 3000, status: 'Delivered' },
// ];
// const mockSalesData = [
//     { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 5000 },
//     { name: 'Thu', sales: 4500 }, { name: 'Fri', sales: 6000 }, { name: 'Sat', sales: 7500 }, { name: 'Sun', sales: 8000 },
// ];
// const mockFishSalesData = [
//   { name: 'Pomfret', sold: 400 }, { name: 'Kingfish', sold: 300 }, { name: 'Mackerel', sold: 500 },
//   { name: 'Sardines', sold: 700 }, { name: 'Tuna', sold: 200 },
// ];


// export const FishermanDashboard = () => {
//     const [activeSection, setActiveSection] = useState('add-catch');
//     const [listings, setListings] = useState(mockListingsData);
//     const [toast, setToast] = useState(null);

//     const addCatch = (newCatch) => {
//         setListings([newCatch, ...listings]);
//         setToast({ message: `${newCatch.name} has been added to your listings.`, type: 'success' });
//     };

//     const sections = {
//         'add-catch': <AddCatchForm onAddCatch={addCatch} />,
//         'my-listings': <MyListings listings={listings} setListings={setListings} />,
//         'orders-received': <OrdersReceived orders={mockOrdersData} />,
//         'analytics': <AnalyticsSection salesData={mockSalesData} fishSalesData={mockFishSalesData} />,
//     };

//     const NavItem = ({ sectionId, icon, label }) => (
//         <button onClick={() => setActiveSection(sectionId)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
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
//                         <div className="flex">
//                            <div className="flex-shrink-0"><CheckCircle className="h-5 w-5 text-green-400" /></div>
//                            <div className="ml-3"><p className="text-sm text-green-700">You're rated 4.7 ★ – Great job!</p></div>
//                         </div>
//                      </div>
//                 </div>
//             </aside>

//             <main className="flex-1 p-6 sm:p-10">
//                 <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//                     <div>
//                         <h2 className="text-3xl font-bold text-gray-900">Welcome, Ramesh!</h2>
//                         <p className="text-gray-500 mt-1">Here's what's happening with your catches today.</p>
//                     </div>
//                     <button className="flex items-center space-x-2 mt-4 sm:mt-0 text-sm font-medium text-gray-600 hover:text-red-500">
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, LayoutGrid, ShoppingCart, BarChart2, MessageSquare, LogOut, CheckCircle } from 'lucide-react';

// Import components from their correct locations
import { Toast } from '../components/Toast';
import { WeatherWidget } from '../components/WeatherWidget';
import { AddCatchForm } from '../components/AddCatchForm';
import { MyListings } from '../components/MyListings';
import { OrdersReceived } from '../components/OrdersReceived';
import { AnalyticsSection } from '../components/AnalyticsSection';

// --- Mock Data ---
const mockListingsData = [
    { id: 1, name: 'Pomfret', quantity: 15, price: 550, freshness: 'Fresh', status: 'Available', imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Pomfret', uploadedAt: '2 hours ago' },
    { id: 2, name: 'Kingfish', quantity: 8, price: 820, freshness: 'Fresh', status: 'Available', imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Kingfish', uploadedAt: '3 hours ago' },
    { id: 3, name: 'Mackerel', quantity: 50, price: 300, freshness: 'Frozen', status: 'Sold', imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Mackerel', uploadedAt: '1 day ago' },
];
const mockOrdersData = [
    { id: 'ORD-001', buyerName: 'Sita Sharma', fishName: 'Pomfret', quantity: 2, totalPrice: 1100, status: 'Pending' },
    { id: 'ORD-002', buyerName: 'Local Restaurant', fishName: 'Kingfish', quantity: 5, totalPrice: 4100, status: 'Confirmed' },
    { id: 'ORD-003', buyerName: 'Anil Kumar', fishName: 'Mackerel', quantity: 10, totalPrice: 3000, status: 'Delivered' },
];
const mockSalesData = [
    { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 4500 }, { name: 'Fri', sales: 6000 }, { name: 'Sat', sales: 7500 }, { name: 'Sun', sales: 8000 },
];
const mockFishSalesData = [
  { name: 'Pomfret', sold: 400 }, { name: 'Kingfish', sold: 300 }, { name: 'Mackerel', sold: 500 },
  { name: 'Sardines', sold: 700 }, { name: 'Tuna', sold: 200 },
];

// --- TypeScript Definitions for Props ---
interface User {
    name: string;
    role: string;
}

interface FishermanDashboardProps {
    user: User;
    onLogout: () => void;
}

// --- The Main Dashboard Component ---
// FIX: Added React.FC<FishermanDashboardProps> to correctly type the component
export const FishermanDashboard: React.FC<FishermanDashboardProps> = ({ user, onLogout }) => {
    const [activeSection, setActiveSection] = useState('add-catch');
    const [listings, setListings] = useState(mockListingsData);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const addCatch = (newCatch: any) => {
        setListings([newCatch, ...listings]);
        setToast({ message: `${newCatch.name} has been added to your listings.`, type: 'success' });
    };

    const sections: { [key: string]: React.ReactNode } = {
        'add-catch': <AddCatchForm onAddCatch={addCatch} />,
        'my-listings': <MyListings listings={listings} setListings={setListings} />,
        'orders-received': <OrdersReceived orders={mockOrdersData} />,
        'analytics': <AnalyticsSection salesData={mockSalesData} fishSalesData={mockFishSalesData} />,
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
