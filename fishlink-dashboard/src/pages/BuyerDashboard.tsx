








// // src/pages/BuyerDashboard.tsx

// import React, { useState, useMemo, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Fish, X, Send, LogOut, MessageSquare, ShoppingCart, Settings, LayoutGrid, Star, SlidersHorizontal } from 'lucide-react';
// import io from 'socket.io-client';

// // --- SOCKET.IO SETUP ---
// const socket = io("http://localhost:3001");

// // --- TYPESCRIPT INTERFACES ---
// interface Product {
//     id: number;
//     fisherman: string;
//     name: string;
//     price: number;
//     freshness: 'Fresh' | 'Frozen';
//     quantity: number;
//     location: string;
//     imageUrl: string;
// }

// interface Order {
//     id: string;
//     fishName: string;
//     seller: string;
//     date: string;
//     quantity: number;
//     totalPrice: number;
//     status: 'Pending' | 'Confirmed' | 'Delivered';
// }

// interface Message {
//     id: number;
//     text: string;
//     sender: 'buyer' | 'fisherman';
//     room: string;
// }

// interface BuyerDashboardProps {
//     user: { name: string };
//     onLogout: () => void;
// }

// // --- MOCK DATA ---
// const mockProducts: Product[] = [
//     { id: 1, fisherman: 'Ramesh K.', name: 'Pomfret', price: 550, freshness: 'Fresh', quantity: 15, location: 'Mangalore', imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Pomfret' },
//     { id: 2, fisherman: 'Suresh P.', name: 'Kingfish', price: 820, freshness: 'Fresh', quantity: 8, location: 'Goa', imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Kingfish' },
//     { id: 3, fisherman: 'Ganesh M.', name: 'Mackerel', price: 300, freshness: 'Frozen', quantity: 50, location: 'Karwar', imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Mackerel' },
//     { id: 4, fisherman: 'Ramesh K.', name: 'Sardines', price: 150, freshness: 'Fresh', quantity: 100, location: 'Mangalore', imageUrl: 'https://placehold.co/600x400/9b59b6/ffffff?text=Sardines' },
// ];
// const mockOrders: Order[] = [
//     { id: 'ORD-001', fishName: 'Pomfret', seller: 'Ramesh K.', date: '2025-07-19', quantity: 2, totalPrice: 1100, status: 'Delivered' },
//     { id: 'ORD-002', fishName: 'Kingfish', seller: 'Suresh P.', date: '2025-07-20', quantity: 5, totalPrice: 4100, status: 'Confirmed' },
// ];

// // --- SUB-COMPONENTS for different sections ---

// const MarketplaceOverview = () => {
//     const [products, setProducts] = useState<Product[]>(mockProducts);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [priceRange, setPriceRange] = useState(1000);

//     const filteredProducts = useMemo(() => {
//         return products
//             .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
//             .filter(p => p.price <= priceRange);
//     }, [products, searchTerm, priceRange]);

//     return (
//         <div className="flex flex-col lg:flex-row gap-8">
//             {/* Filters Sidebar */}
//             <aside className="w-full lg:w-1/4 xl:w-1/5">
//                 <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
//                     <h3 className="text-lg font-bold mb-4 flex items-center"><SlidersHorizontal size={20} className="mr-2" /> Filters</h3>
//                     <div className="space-y-6">
//                         <div>
//                             <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Fish</label>
//                             <div className="relative mt-1">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                                 <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range (Max: ₹{priceRange})</label>
//                             <input type="range" id="priceRange" min="100" max="1000" step="50" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full mt-2" />
//                         </div>
//                         {/* Other filters can be added here */}
//                     </div>
//                 </div>
//             </aside>
//             {/* Products Grid */}
//             <div className="flex-1">
//                 <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                     {filteredProducts.map(product => (
//                         <ProductCard key={product.id} product={product} />
//                     ))}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// const ProductCard = ({ product }) => (
//     <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
//         <div className="p-5">
//             <h3 className="text-xl font-bold">{product.name}</h3>
//             <p className="text-sm text-gray-500">from {product.fisherman}</p>
//             <div className="flex justify-between items-center mt-4">
//                 <p className="text-2xl font-bold text-blue-600">₹{product.price}<span className="text-sm font-normal">/kg</span></p>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">View Details</button>
//             </div>
//         </div>
//     </motion.div>
// );

// const MyOrdersPage = () => (
//     <div className="bg-white p-8 rounded-2xl shadow-lg">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h3>
//         <div className="overflow-x-auto">
//             <table className="min-w-full">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y">
//                     {mockOrders.map(order => (
//                         <tr key={order.id}>
//                             <td className="px-6 py-4 font-medium">{order.id}</td>
//                             <td className="px-6 py-4">{order.fishName} ({order.quantity}kg)</td>
//                             <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></td>
//                             <td className="px-6 py-4 font-semibold">₹{order.totalPrice.toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
// );

// const MessagingPage = () => (
//      <div className="bg-white rounded-2xl shadow-lg h-[70vh] flex">
//         <div className="w-1/3 border-r">
//             <div className="p-4 font-bold border-b">Conversations</div>
//             {/* List of conversations would go here */}
//         </div>
//         <div className="w-2/3 flex flex-col">
//             <div className="p-4 font-bold border-b">Chat with Ramesh K.</div>
//             <div className="flex-grow p-4 bg-gray-50">
//                 {/* Chat messages would go here */}
//             </div>
//             <div className="p-4 border-t flex">
//                 <input type="text" placeholder="Type a message..." className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" />
//                 <button className="bg-blue-600 text-white p-3 rounded-lg ml-2"><Send size={20} /></button>
//             </div>
//         </div>
//     </div>
// );

// // --- MAIN BUYER DASHBOARD PAGE ---
// export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, onLogout }) => {
//     const [activeSection, setActiveSection] = useState('marketplace');
    
//     const sections = {
//         'marketplace': <MarketplaceOverview />,
//         'orders': <MyOrdersPage />,
//         'messages': <MessagingPage />,
//     };

//     const NavItem = ({ sectionId, icon, label }) => (
//         <button onClick={() => setActiveSection(sectionId)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
//             {icon}
//             <span className="font-medium">{label}</span>
//         </button>
//     );

//     return (
//         <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
//             <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0 border-r">
//                 <h1 className="text-2xl font-bold text-blue-700 mb-8">🛍️ Buyer Dashboard</h1>
//                 <nav className="space-y-3">
//                     <NavItem sectionId="marketplace" icon={<LayoutGrid size={20} />} label="Marketplace" />
//                     <NavItem sectionId="orders" icon={<ShoppingCart size={20} />} label="My Orders" />
//                     <NavItem sectionId="messages" icon={<MessageSquare size={20} />} label="Messages" />
//                     <NavItem sectionId="settings" icon={<Settings size={20} />} label="Settings" />
//                 </nav>
//             </aside>

//             <main className="flex-1 p-6 sm:p-10">
//                 <header className="flex justify-between items-center mb-8">
//                     <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'Guest'}!</h2>
//                     <button onClick={onLogout} className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-500">
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







// src/pages/BuyerDashboard.tsx

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Fish, LogOut, MessageSquare, ShoppingCart, Settings, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import io from 'socket.io-client';

// --- TYPESCRIPT INTERFACES ---
interface Product {
    id: number;
    fisherman: string;
    name: string;
    price: number;
    freshness: 'Fresh' | 'Frozen';
    quantity: number;
    location: string;
    imageUrl: string;
}

interface Order {
    id: string;
    fishName: string;
    seller: string;
    date: string;
    quantity: number;
    totalPrice: number;
    status: 'Pending' | 'Confirmed' | 'Delivered';
}

interface BuyerDashboardProps {
    user: { name: string };
    onLogout: () => void;
}

// Define the possible sections for type safety
type SectionId = 'marketplace' | 'orders' | 'messages' | 'settings';


// --- MOCK DATA ---
const mockProducts: Product[] = [
    { id: 1, fisherman: 'Ramesh K.', name: 'Pomfret', price: 550, freshness: 'Fresh', quantity: 15, location: 'Mangalore', imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Pomfret' },
    { id: 2, fisherman: 'Suresh P.', name: 'Kingfish', price: 820, freshness: 'Fresh', quantity: 8, location: 'Goa', imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Kingfish' },
    { id: 3, fisherman: 'Ganesh M.', name: 'Mackerel', price: 300, freshness: 'Frozen', quantity: 50, location: 'Karwar', imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Mackerel' },
    { id: 4, fisherman: 'Ramesh K.', name: 'Sardines', price: 150, freshness: 'Fresh', quantity: 100, location: 'Mangalore', imageUrl: 'https://placehold.co/600x400/9b59b6/ffffff?text=Sardines' },
];
const mockOrders: Order[] = [
    { id: 'ORD-001', fishName: 'Pomfret', seller: 'Ramesh K.', date: '2025-07-19', quantity: 2, totalPrice: 1100, status: 'Delivered' },
    { id: 'ORD-002', fishName: 'Kingfish', seller: 'Suresh P.', date: '2025-07-20', quantity: 5, totalPrice: 4100, status: 'Confirmed' },
];

// --- SUB-COMPONENTS for different sections ---

const MarketplaceOverview: React.FC = () => {
    const [products] = useState<Product[]>(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(1000);

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(p => p.price <= priceRange);
    }, [products, searchTerm, priceRange]);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/4 xl:w-1/5">
                <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                    <h3 className="text-lg font-bold mb-4 flex items-center"><SlidersHorizontal size={20} className="mr-2" /> Filters</h3>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Fish</label>
                            <div className="relative mt-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range (Max: ₹{priceRange})</label>
                            <input type="range" id="priceRange" min="100" max="1000" step="50" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full mt-2" />
                        </div>
                    </div>
                </div>
            </aside>
            <div className="flex-1">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-5">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">from {product.fisherman}</p>
            <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-bold text-blue-600">₹{product.price}<span className="text-sm font-normal">/kg</span></p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">View Details</button>
            </div>
        </div>
    </motion.div>
);

const MyOrdersPage: React.FC = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {mockOrders.map(order => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 font-medium">{order.id}</td>
                            <td className="px-6 py-4">{order.fishName} ({order.quantity}kg)</td>
                            <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></td>
                            <td className="px-6 py-4 font-semibold">₹{order.totalPrice.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const MessagingPage: React.FC = () => (
     <div className="bg-white rounded-2xl shadow-lg h-[70vh] flex">
        <div className="w-1/3 border-r">
            <div className="p-4 font-bold border-b">Conversations</div>
        </div>
        <div className="w-2/3 flex flex-col">
            <div className="p-4 font-bold border-b">Chat with Ramesh K.</div>
            <div className="flex-grow p-4 bg-gray-50"></div>
            <div className="p-4 border-t flex">
                <input type="text" placeholder="Type a message..." className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" />
            </div>
        </div>
    </div>
);

// --- MAIN BUYER DASHBOARD PAGE ---
export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, onLogout }) => {
    const [activeSection, setActiveSection] = useState<SectionId>('marketplace');
    
    const sections: { [key in SectionId]: React.ReactNode } = {
        'marketplace': <MarketplaceOverview />,
        'orders': <MyOrdersPage />,
        'messages': <MessagingPage />,
        'settings': <div>Settings Page Content</div>,
    };

    const NavItem = ({ sectionId, icon, label }: { sectionId: SectionId; icon: React.ReactNode; label: string }) => (
        <button onClick={() => setActiveSection(sectionId)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeSection === sectionId ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
            <aside className="w-full lg:w-64 bg-white p-6 lg:sticky lg:top-0 lg:h-screen flex-shrink-0 border-r">
                <h1 className="text-2xl font-bold text-blue-700 mb-8">🛍️ Buyer Dashboard</h1>
                <nav className="space-y-3">
                    <NavItem sectionId="marketplace" icon={<LayoutGrid size={20} />} label="Marketplace" />
                    <NavItem sectionId="orders" icon={<ShoppingCart size={20} />} label="My Orders" />
                    <NavItem sectionId="messages" icon={<MessageSquare size={20} />} label="Messages" />
                    <NavItem sectionId="settings" icon={<Settings size={20} />} label="Settings" />
                </nav>
            </aside>

            <main className="flex-1 p-6 sm:p-10">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'Guest'}!</h2>
                    <button onClick={onLogout} className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-500">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </header>
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
            </main>
        </div>
    );
};
