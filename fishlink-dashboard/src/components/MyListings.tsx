// // import { Edit, Trash2 } from 'lucide-react';
// // import { motion } from 'framer-motion';

// // interface Listing {
// //   id: number; name: string; price: number;
// //   quantity: number; freshness: string; status: string; imageUrl: string;
// // }

// // interface Props {
// //   listings: Listing[];
// //   setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
// // }

// // export const MyListings: React.FC<Props> = ({ listings, setListings }) => {
// //   const deleteListing = (id: number) => setListings(listings.filter(l => l.id !== id));

// //   return (
// //     <div id="my-listings" className="mt-12">
// //       <h3 className="text-2xl font-bold text-gray-800 mb-6">My Active Listings</h3>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {listings.map(listing => (
// //           <motion.div key={listing.id} layout className="bg-white rounded-2xl shadow-lg overflow-hidden group">
// //             <img src={listing.imageUrl} alt={listing.name} className="w-full h-48 object-cover" />
// //             <div className="p-5">
// //               <div className="flex justify-between items-start">
// //                 <h4 className="text-xl font-bold">{listing.name}</h4>
// //                 <span
// //                   className={`px-3 py-1 text-xs font-semibold rounded-full ${
// //                     listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
// //                   }`}
// //                 >
// //                   {listing.status}
// //                 </span>
// //               </div>
// //               <p className="text-sm text-gray-500 mt-1">{listing.freshness}</p>
// //               <div className="flex justify-between mt-4">
// //                 <p className="text-lg font-bold text-blue-600">₹{listing.price}/kg</p>
// //                 <p className="text-gray-600">{listing.quantity} kg left</p>
// //               </div>
// //             </div>
// //             <div className="bg-gray-50 p-3 flex justify-end space-x-2">
// //               <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full"><Edit size={18} /></button>
// //               <button
// //                 onClick={() => deleteListing(listing.id)}
// //                 className="p-2 text-gray-500 hover:text-red-600 rounded-full"
// //               ><Trash2 size={18} /></button>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };




// import React from 'react';

// const MyListings = () => {
//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-semibold">My Listings</h2>
//       <ul>
//         <li>Tuna - 5kg - ₹1000</li>
//         <li>Salmon - 3kg - ₹800</li>
//       </ul>
//     </div>
//   );
// };

// export default MyListings;




// src/components/MyListings.tsx
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

export const MyListings = ({ listings, setListings }) => {
    const deleteListing = (id) => {
        setListings(listings.filter(l => l.id !== id));
    };
    return (
        <div id="my-listings">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">My Active Listings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map(listing => (
                    <motion.div key={listing.id} layout className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                        <img src={listing.imageUrl} alt={listing.name} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <h4 className="text-xl font-bold text-gray-900">{listing.name}</h4>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{listing.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{listing.freshness}</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-lg font-bold text-blue-600">₹{listing.price}/kg</p>
                                <p className="text-gray-600">{listing.quantity} kg left</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 flex justify-end space-x-2">
                             <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full"><Edit size={18} /></button>
                             <button onClick={() => deleteListing(listing.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full"><Trash2 size={18} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};