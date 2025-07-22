




// // src/components/MyListings.tsx
// // src/components/MyListings.tsx

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Edit, Trash2, Eye, X } from 'lucide-react';

// // --- TypeScript Definitions ---
// interface Product {
//     _id: string;
//     fishName: string;
//     price: number;
//     quantity: number;
//     freshness: string;
//     imageUrl: string;
//     description: string;
// }

// // --- Details Modal Component ---
// const DetailsModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
//     const backendUrl = 'http://localhost:5000';

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
//             onClick={onClose}
//         >
//             <motion.div
//                 initial={{ scale: 0.8, y: 50 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.8, y: 50 }}
//                 className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <img 
//                     src={product.imageUrl ? `${backendUrl}${product.imageUrl}` : `https://placehold.co/600x400/7f8c8d/ffffff?text=${product.fishName}`} 
//                     alt={product.fishName} 
//                     className="w-full h-64 object-cover" 
//                 />
//                 <div className="p-6">
//                     <div className="flex justify-between items-start">
//                         <h3 className="text-2xl font-bold text-gray-900">{product.fishName}</h3>
//                         <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-100">
//                             <X size={24} />
//                         </button>
//                     </div>
//                     <p className="mt-4 text-gray-600">{product.description || "No description was provided for this catch."}</p>
//                     <div className="mt-6 border-t pt-4">
//                         <div className="flex justify-between text-sm text-gray-500">
//                             <span>Price: <span className="font-semibold text-gray-800">₹{product.price}/kg</span></span>
//                             <span>Quantity: <span className="font-semibold text-gray-800">{product.quantity} kg</span></span>
//                             <span>Freshness: <span className="font-semibold text-gray-800">{product.freshness}</span></span>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // --- Main MyListings Component ---
// // This component now fetches its own data and manages its own state.
// export const MyListings: React.FC = () => {
//     const [myListings, setMyListings] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//     const backendUrl = 'http://localhost:5000';

//     useEffect(() => {
//         const fetchMyListings = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await fetch('http://localhost:5000/api/products/my-listings', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'auth-token': token
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch listings');
//                 }

//                 const data = await response.json();
//                 setMyListings(data);
//             } catch (error) {
//                 console.error("Error fetching listings:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMyListings();
//     }, []);

//     if (loading) {
//         return <div className="text-center py-12">Loading your listings...</div>;
//     }

//     return (
//         <div id="my-listings">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">My Active Listings</h3>
            
//             {myListings.length === 0 ? (
//                 <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <p className="text-gray-500">You haven't added any catches yet.</p>
//                     <p className="text-sm text-gray-400 mt-2">Go to the "Add Catch" tab to get started!</p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {myListings.map(listing => (
//                         <motion.div key={listing._id} layout className="bg-white rounded-2xl shadow-lg overflow-hidden group">
//                             <img 
//                                 src={listing.imageUrl ? `${backendUrl}${listing.imageUrl}` : `https://placehold.co/600x400/7f8c8d/ffffff?text=${listing.fishName}`} 
//                                 alt={listing.fishName} 
//                                 className="w-full h-48 object-cover" 
//                             />
//                             <div className="p-5">
//                                 <div className="flex justify-between items-start">
//                                     <h4 className="text-xl font-bold text-gray-900">{listing.fishName}</h4>
//                                     <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800`}>Available</span>
//                                 </div>
//                                 <p className="text-sm text-gray-500 mt-1">{listing.freshness}</p>
//                                 <div className="flex justify-between items-center mt-4">
//                                     <p className="text-lg font-bold text-blue-600">₹{listing.price}/kg</p>
//                                     <p className="text-gray-600">{listing.quantity} kg left</p>
//                                 </div>
//                             </div>
//                             <div className="bg-gray-50 p-3 flex justify-end space-x-2">
//                                 <button onClick={() => setSelectedProduct(listing)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full" title="View Details">
//                                     <Eye size={18} />
//                                 </button>
//                                 <button className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-gray-200 rounded-full" title="Edit">
//                                     <Edit size={18} />
//                                 </button>
//                                 <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full" title="Delete">
//                                     <Trash2 size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             )}

//             <AnimatePresence>
//                 {selectedProduct && (
//                     <DetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };



























// src/components/MyListings.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Eye, X } from 'lucide-react';

// --- TypeScript Definitions ---
interface Product {
    _id: string;
    fishName: string;
    price: number;
    quantity: number;
    freshness: string;
    imageUrl: string;
    description: string;
}

// --- Details Modal Component ---
const DetailsModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
    const backendUrl = 'http://localhost:5000';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={product.imageUrl ? `${backendUrl}${product.imageUrl}` : `https://placehold.co/600x400/7f8c8d/ffffff?text=${product.fishName}`}
                    alt={product.fishName}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-gray-900">{product.fishName}</h3>
                        <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-100">
                            <X size={24} />
                        </button>
                    </div>
                    <p className="mt-4 text-gray-600">{product.description || "No description was provided for this catch."}</p>
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Price: <span className="font-semibold text-gray-800">₹{product.price}/kg</span></span>
                            <span>Quantity: <span className="font-semibold text-gray-800">{product.quantity} kg</span></span>
                            <span>Freshness: <span className="font-semibold text-gray-800">{product.freshness}</span></span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Main MyListings Component ---
// This component fetches its own data and manages its own state.
export const MyListings: React.FC = () => {
    const [myListings, setMyListings] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const backendUrl = 'http://localhost:5000';

    useEffect(() => {
        const fetchMyListings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/api/products/my-listings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }

                const data = await response.json();
                setMyListings(data);
            } catch (error) {
                console.error("Error fetching listings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyListings();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Loading your listings...</div>;
    }

    return (
        <div id="my-listings">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">My Active Listings</h3>

            {myListings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">You haven't added any catches yet.</p>
                    <p className="text-sm text-gray-400 mt-2">Go to the "Add Catch" tab to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myListings.map(listing => (
                        <motion.div key={listing._id} layout className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                            <img
                                src={listing.imageUrl ? `${backendUrl}${listing.imageUrl}` : `https://placehold.co/600x400/7f8c8d/ffffff?text=${listing.fishName}`}
                                alt={listing.fishName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-xl font-bold text-gray-900">{listing.fishName}</h4>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800`}>Available</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{listing.freshness}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-lg font-bold text-blue-600">₹{listing.price}/kg</p>
                                    <p className="text-gray-600">{listing.quantity} kg left</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 flex justify-end space-x-2">
                                <button onClick={() => setSelectedProduct(listing)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full" title="View Details">
                                    <Eye size={18} />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-gray-200 rounded-full" title="Edit">
                                    <Edit size={18} />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full" title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {selectedProduct && (
                    <DetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};