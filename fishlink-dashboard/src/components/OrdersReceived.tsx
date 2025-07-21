// // const mockOrders = [
// //   { id: 'ORD-001', buyerName: 'Sita Sharma', fishName: 'Pomfret', quantity: 2, totalPrice: 1100, status: 'Pending' },
// //   { id: 'ORD-002', buyerName: 'Local Restaurant', fishName: 'Kingfish', quantity: 5, totalPrice: 4100, status: 'Confirmed' },
// //   { id: 'ORD-003', buyerName: 'Anil Kumar', fishName: 'Mackerel', quantity: 10, totalPrice: 3000, status: 'Delivered' },
// // ];

// // export const OrdersReceived: React.FC = () => (
// //   <div id="orders-received" className="mt-12">
// //     <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h3>
// //     <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
// //       <table className="min-w-full divide-y divide-gray-200">
// //         <thead className="bg-gray-50">
// //           <tr>{/* headers... */}</tr>
// //         </thead>
// //         <tbody className="bg-white divide-y divide-gray-200">
// //           {mockOrders.map(order => (
// //             <tr key={order.id}>
// //               {/* cells... */}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   </div>
// // );




// import React from 'react';

// const OrdersReceived = () => {
//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-semibold">Orders Received</h2>
//       <ul>
//         <li>Order #123 - Tuna - 2kg</li>
//         <li>Order #124 - Salmon - 1kg</li>
//       </ul>
//     </div>
//   );
// };

// export default OrdersReceived;



// src/components/OrdersReceived.tsx
export const OrdersReceived = ({ orders }) => (
    <div id="orders-received">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h3>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.buyerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.fishName} ({order.quantity}kg)</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalPrice.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                    }`}>{order.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {order.status === 'Pending' && <button className="text-blue-600 hover:text-blue-900">Confirm</button>}
                                    {order.status === 'Confirmed' && <button className="text-green-600 hover:text-green-900">Mark Delivered</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);