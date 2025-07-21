// src/pages/HomePage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Ship, Users, ShieldCheck, ArrowRight, BarChart2, MessageSquare, CloudSun, CreditCard, Star, UploadCloud, Search } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// --- TypeScript Interfaces for Props ---
interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

interface SectionTitleProps {
    children: React.ReactNode;
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    text: string;
}

interface TechBadgeProps {
    icon: React.ReactNode;
    name: string;
}

interface HomePageProps {
    onLoginClick: () => void;
}

// --- Helper Components with Typed Props ---

const Section: React.FC<SectionProps> = ({ children, className = '' }) => (
    <section className={`py-16 md:py-24 ${className}`}>
        <div className="container mx-auto px-6">{children}</div>
    </section>
);

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">{children}</h2>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text }) => (
    <motion.div 
        className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-blue-500"
        whileHover={{ y: -10, shadow: 'xl' }}
    >
        <div className="mx-auto bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <h3 className="mt-6 text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-500">{text}</p>
    </motion.div>
);

const TechBadge: React.FC<TechBadgeProps> = ({ icon, name }) => (
    <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2">
        {icon}
        <span className="font-semibold text-gray-700">{name}</span>
    </div>
);

// --- Mock Data for Charts ---
const mockPriceTrendData = [
    { month: 'Jan', price: 450 }, { month: 'Feb', price: 480 }, { month: 'Mar', price: 520 },
    { month: 'Apr', price: 500 }, { month: 'May', price: 550 }, { month: 'Jun', price: 580 },
];

// --- Main Homepage Component ---
export const HomePage: React.FC<HomePageProps> = ({ onLoginClick }) => {
    return (
        <div className="bg-white text-gray-800">
            {/* 1. Header & Hero Section */}
            <header className="relative bg-cover bg-center text-white" style={{ backgroundImage: "url('https://placehold.co/1920x1080/0d2439/ffffff?text=Fishermen+at+Sunrise')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <nav className="relative z-10 container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">🐟 FishLink</h1>
                    <div>
                        <button onClick={onLoginClick} className="bg-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                            Login / Register
                        </button>
                    </div>
                </nav>
                <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-32">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold"
                    >
                        Bridging Coast to Kitchen
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200"
                    >
                        The transparent marketplace connecting sustainable fishermen directly with restaurants and home cooks. Fresher fish, fairer prices.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8 flex justify-center space-x-4"
                    >
                        <button onClick={onLoginClick} className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
                            Explore Marketplace
                        </button>
                        <button onClick={onLoginClick} className="border-2 border-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                            Join as Fisherman
                        </button>
                    </motion.div>
                </div>
            </header>

            {/* 2. About FishLink */}
            <Section>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800">Our Mission: A Fairer Sea for All</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            The traditional seafood supply chain is broken. Fishermen are underpaid while consumers pay high prices for fish that isn't as fresh as it could be. FishLink was built to solve this by eliminating middlemen, creating a direct line of communication and commerce between the coast and your kitchen.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <p className="text-4xl font-bold text-blue-600">30%</p>
                            <p className="text-gray-600">Average Consumer Savings</p>
                        </div>
                         <div className="bg-green-50 p-6 rounded-xl">
                            <p className="text-4xl font-bold text-green-600">10,000+</p>
                            <p className="text-gray-600">Fishermen Empowered</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 3. How It Works */}
            <Section className="bg-gray-50">
                <SectionTitle>A Simple, 3-Step Process</SectionTitle>
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    <div className="p-6">
                        <div className="text-5xl font-bold text-blue-200">1</div>
                        <UploadCloud size={48} className="mx-auto text-blue-600 my-4" />
                        <h3 className="text-xl font-bold">Fishermen Upload Catch</h3>
                        <p className="text-gray-500 mt-2">Sellers list their daily catch with photos, quantity, and price in minutes.</p>
                    </div>
                     <div className="p-6">
                        <div className="text-5xl font-bold text-blue-200">2</div>
                        <Search size={48} className="mx-auto text-blue-600 my-4" />
                        <h3 className="text-xl font-bold">Buyers Browse & Negotiate</h3>
                        <p className="text-gray-500 mt-2">Buyers filter by location and fish type, then start a real-time chat to agree on a price.</p>
                    </div>
                     <div className="p-6">
                        <div className="text-5xl font-bold text-blue-200">3</div>
                        <Ship size={48} className="mx-auto text-blue-600 my-4" />
                        <h3 className="text-xl font-bold">Coordinate Delivery</h3>
                        <p className="text-gray-500 mt-2">Once a deal is made, both parties coordinate a direct pickup or delivery.</p>
                    </div>
                </div>
            </Section>

            {/* 4. Features */}
            <Section>
                <SectionTitle>Platform Highlights</SectionTitle>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard icon={<Users size={32} />} title="Role-Based Dashboards" text="Custom-tailored interfaces for Fishermen, Buyers, and Admins to manage their specific needs." />
                    <FeatureCard icon={<MessageSquare size={32} />} title="Real-Time Negotiation" text="A built-in chat system allows direct communication for price negotiation and logistics." />
                    <FeatureCard icon={<CloudSun size={32} />} title="Weather-Based Tips" text="Fishermen get insights on optimal fishing conditions based on integrated weather APIs." />
                    <FeatureCard icon={<BarChart2 size={32} />} title="Visual Sales Analytics" text="Sellers can track their earnings, most popular fish, and price trends over time." />
                    <FeatureCard icon={<CreditCard size={32} />} title="Secure Payments" text="Integrated payment gateways like Stripe & Razorpay ensure all transactions are safe." />
                    <FeatureCard icon={<ShieldCheck size={32} />} title="Trusted & Transparent" text="A rating system and clear order tracking build a community of trust and accountability." />
                </div>
            </Section>
            
            {/* 9. Data & Insights */}
            <Section className="bg-gray-50">
                <SectionTitle>Data-Driven Insights</SectionTitle>
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                     <h4 className="font-semibold text-gray-700 mb-4 text-center">Mock Price Trends for Kingfish (Last 6 Months)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockPriceTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `₹${value}`} />
                            <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                            <Line type="monotone" dataKey="price" stroke="#3498db" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Section>

            {/* 11. Testimonials */}
            <Section>
                <SectionTitle>Voices from Our Community</SectionTitle>
                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400" fill="currentColor" />)}</div>
                        <p className="text-gray-600 italic">"FishLink has changed my business. I get better prices and connect with restaurants I never could before."</p>
                        <p className="font-semibold text-gray-900 mt-4">- Ramesh K., Fisherman</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400" fill="currentColor" />)}</div>
                        <p className="text-gray-600 italic">"The quality is unmatched. Knowing exactly where my fish comes from is a game-changer for my restaurant."</p>
                        <p className="font-semibold text-gray-900 mt-4">- Priya Sharma, Restaurant Owner</p>
                    </div>
                </div>
            </Section>

            {/* 12. Final CTA */}
            <Section className="bg-blue-600 text-white text-center">
                 <h2 className="text-4xl font-bold">Ready to Join the Revolution?</h2>
                 <p className="mt-4 text-lg text-blue-200">Whether you're selling your catch or sourcing the freshest ingredients, FishLink is for you.</p>
                 <div className="mt-8 flex justify-center space-x-4">
                    <button onClick={onLoginClick} className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100">Sign Up as a Fisherman</button>
                    <button onClick={onLoginClick} className="border-2 border-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600">Start Buying Fresh Fish</button>
                 </div>
            </Section>

            {/* 14. Footer */}
            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 FishLink. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};
