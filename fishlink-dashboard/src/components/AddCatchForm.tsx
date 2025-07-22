



import React, { useState } from 'react';
import { PlusCircle, HelpCircle, Sparkles, Image as ImageIcon } from 'lucide-react';

// --- TypeScript Definitions ---
interface AddCatchFormProps {
    onCatchAdded: () => void;
    // For a better user experience, you could pass a toast notification function from the parent dashboard.
    // Example: setToast: (toast: { message: string; type: 'success' | 'error' }) => void; 
}

interface PriceSuggestion {
    suggestedPrice: number;
    reason: string;
}

export const AddCatchForm: React.FC<AddCatchFormProps> = ({ onCatchAdded }) => {
    // --- Component State ---
    const [fishName, setFishName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('Mangalore');
    const [description, setDescription] = useState('');
    const [freshness, setFreshness] = useState('Fresh');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);
    const [isLoadingDesc, setIsLoadingDesc] = useState(false);
    const [priceSuggestion, setPriceSuggestion] = useState<PriceSuggestion | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null); // State to hold and display form error messages

    // --- Image Handler ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError(null); // Clear previous errors when a new image is selected
        }
    };

    // --- AI Function 1: Get Price Suggestion ---
    const handleGetPriceSuggestion = async () => {
        if (!fishName) {
            setError('Please enter a fish name first to get a price suggestion.');
            return;
        }
        setIsLoadingPrice(true);
        setError(null);
        setPriceSuggestion(null);
        try {
            const response = await fetch('http://localhost:5000/api/ai/suggest-price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fishName, location, freshness, quantity: parseInt(quantity) || 10 })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get suggestion from the server.');
            }
            const data: PriceSuggestion = await response.json();
            setPriceSuggestion(data);
            setPrice(data.suggestedPrice.toString());
        } catch (error: any) {
            console.error(error);
            setError(error.message);
            setPriceSuggestion({ suggestedPrice: 0, reason: 'Could not get a suggestion at this time.' });
        } finally {
            setIsLoadingPrice(false);
        }
    };
    
    // --- AI Function 2: Generate Description ---
    const handleGenerateDescription = async () => {
        if (!fishName) {
            setError('Please enter a fish name first to generate a description.');
            return;
        }
        setIsLoadingDesc(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/ai/generate-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fishName })
            });
            if (!response.ok) {
                 const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate description.');
            }
            const data = await response.json();
            setDescription(data.description);
        } catch (error: any) {
             console.error(error);
             setError(error.message);
             setDescription("Failed to generate a description.");
        } finally {
            setIsLoadingDesc(false);
        }
    };

    // --- Form Submission Handler ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors on a new submission attempt

        if (!image) {
            setError("Please upload an image for the catch.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication error. You are not logged in. Please log in again.');
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('fishName', fishName);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('freshness', freshness);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'auth-token': token
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed with status ${response.status}`);
            }

            console.log('Catch added successfully!');
            
            // Reset form fields to their initial state
            setFishName('');
            setQuantity('');
            setPrice('');
            setDescription('');
            setPriceSuggestion(null);
            setImage(null);
            setImagePreview(null);
            
            // Trigger the parent component to refresh its listings
            onCatchAdded();

        } catch (error: any) {
            console.error('Error submitting form:', error);
            setError(error.message); // Display the specific error to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="add-catch" className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add a New Catch</h3>
            
            {/* Display Form Error Message */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Upload Section */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catch Image</label>
                        <div className="mt-1 flex items-center space-x-6">
                            <div className="shrink-0">
                                {imagePreview ? (
                                    <img className="h-20 w-20 object-cover rounded-lg" src={imagePreview} alt="Current catch" />
                                ) : (
                                    <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose catch photo</span>
                                <input type="file" onChange={handleImageChange} accept="image/png, image/jpeg" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                            </label>
                        </div>
                    </div>

                    {/* Other Form Fields */}
                    <div>
                        <label htmlFor="fishName" className="block text-sm font-medium text-gray-700 mb-1">Fish Name</label>
                        <input type="text" id="fishName" value={fishName} onChange={e => setFishName(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" placeholder="e.g., Pomfret" required/>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (in kg)</label>
                        <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" placeholder="e.g., 20" required/>
                    </div>
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select id="location" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0">
                            <option>Mangalore</option>
                            <option>Goa</option>
                            <option>Kochi</option>
                            <option>Karwar</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Freshness</label>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            <button type="button" onClick={() => setFreshness('Fresh')} className={`w-full py-1.5 rounded-md text-sm font-medium ${freshness === 'Fresh' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}>Fresh</button>
                            <button type="button" onClick={() => setFreshness('Frozen')} className={`w-full py-1.5 rounded-md text-sm font-medium ${freshness === 'Frozen' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}>Frozen</button>
                        </div>
                    </div>
                </div>

                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <div className="relative">
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" placeholder="A short description of your catch..."></textarea>
                        <button type="button" onClick={handleGenerateDescription} disabled={isLoadingDesc} className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 disabled:opacity-50" title="Generate AI Description">
                            {isLoadingDesc ? <div className="animate-spin h-5 w-5 border-b-2 border-blue-600 rounded-full"></div> : <Sparkles size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price per kg (₹)</label>
                    <div className="relative">
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:ring-0" placeholder="e.g., 550" required/>
                        <button type="button" onClick={handleGetPriceSuggestion} disabled={isLoadingPrice} className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:opacity-50" title="Get AI Price Suggestion">
                            {isLoadingPrice ? <div className="animate-spin h-5 w-5 border-b-2 border-blue-600 rounded-full"></div> : <HelpCircle size={20} />}
                        </button>
                    </div>
                    {priceSuggestion && (
                        <p className="mt-2 text-xs text-gray-500 bg-blue-50 p-2 rounded-lg">
                            <strong>AI Suggestion:</strong> {priceSuggestion.reason}
                        </p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button  
                        type="submit"  
                        disabled={isSubmitting}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : (
                            <>
                                <PlusCircle className="mr-2" size={20} /> Add Catch to Listings
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
