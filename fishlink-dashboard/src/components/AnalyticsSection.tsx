// // import {
// //   ResponsiveContainer, LineChart, BarChart, CartesianGrid,
// //   XAxis, YAxis, Tooltip, Legend, Line, Bar
// // } from 'recharts';

// // const mockSalesData = [
// //   { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 5000 },
// //   { name: 'Thu', sales: 4500 }, { name: 'Fri', sales: 6000 }, { name: 'Sat', sales: 7500 }, { name: 'Sun', sales: 8000 },
// // ];

// // const mockFishSalesData = [
// //   { name: 'Pomfret', sold: 400 }, { name: 'Kingfish', sold: 300 },
// //   { name: 'Mackerel', sold: 500 }, { name: 'Sardines', sold: 700 }, { name: 'Tuna', sold: 200 },
// // ];

// // export const AnalyticsSection: React.FC = () => (
// //   <div id="analytics" className="mt-12">
// //     <h3 className="text-2xl font-bold text-gray-800 mb-6">Sales Analytics</h3>
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //       <div className="bg-white p-6 rounded-2xl shadow-lg">
// //         <h4 className="font-semibold text-gray-700 mb-4">Weekly Sales (₹)</h4>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={mockSalesData}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line type="monotone" dataKey="sales" stroke="#3498db" strokeWidth={2} />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>
// //       <div className="bg-white p-6 rounded-2xl shadow-lg">
// //         <h4 className="font-semibold text-gray-700 mb-4">Top Selling Fish (by kg)</h4>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={mockFishSalesData}>
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Bar dataKey="sold" fill="#2ecc71" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   </div>
// // );



// import React from 'react';

// const AnalyticsSection = () => {
//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-semibold">Catch Analytics</h2>
//       <p>Display catch trends, earnings, etc. here.</p>
//     </div>
//   );
// };

// export default AnalyticsSection;



// src/components/AnalyticsSection.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export const AnalyticsSection = ({ salesData, fishSalesData }) => (
    <div id="analytics">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Sales Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-gray-700 mb-4">Weekly Sales (₹)</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#3498db" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-gray-700 mb-4">Top Selling Fish (by kg)</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fishSalesData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sold" fill="#2ecc71" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);