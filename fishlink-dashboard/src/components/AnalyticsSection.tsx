
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