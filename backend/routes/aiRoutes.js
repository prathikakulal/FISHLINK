

// /*
//  * This is the final, robust version of the AI route.
//  * It includes logic to safely extract JSON from the AI's response,
//  * preventing crashes even if the AI adds extra text.
//  */

// const express = require('express');
// const router = express.Router();
// const fetch = require('node-fetch');
// const Product = require('../models/Product');

// router.post('/suggest-price', async (req, res) => {
//     const { fishName, quantity, location } = req.body;
//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
//     const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//     try {
//         const historicalData = await Product.find({ fishName, location })
//             .sort({ createdAt: -1 })
//             .limit(5)
//             .select('price createdAt -_id');

//         // --- IMPROVED PROMPT ---
//         // Added a clear instruction for how to handle empty historical data.
//         const prompt = `
//             You are a fish market pricing expert for the coastal regions of India.
//             A fisherman in ${location} has a new catch of ${quantity}kg of ${fishName}.

//             Here is the pricing data for the last few sales of ${fishName} in the same area:
//             ${JSON.stringify(historicalData)}

//             Based on this historical data, suggest a fair but competitive market price per kg.
//             IMPORTANT: If the historical data array is empty, use your general knowledge of Indian fish markets to estimate a price for this fish in this location.

//             Return your answer ONLY in the following JSON format, with no extra text or markdown formatting:
//             {
//               "suggestedPrice": <number>,
//               "reason": "<A brief, one-sentence justification for your price>"
//             }
//         `;

//         // --- IMPROVED PAYLOAD ---
//         // Added generationConfig to force a JSON response from the API.
//         const payload = {
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//             generationConfig: {
//                 responseMimeType: "application/json",
//             }
//         };

//         const apiResponse = await fetch(API_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });

//         if (!apiResponse.ok) {
//             const errorBody = await apiResponse.text();
//             console.error("Gemini API Error Body:", errorBody);
//             throw new Error(`Gemini API call failed with status: ${apiResponse.status}`);
//         }
        
//         const result = await apiResponse.json();

//         // Because we are now forcing a JSON response type, the robust parsing is less critical,
//         // but we will keep it as a safety measure.
//         const aiResponseText = result.candidates[0].content.parts[0].text;
        
//         console.log("Raw AI Response Text:", aiResponseText); // For debugging

//         // --- FIX: Robust JSON Parsing ---
//         const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
        
//         if (jsonMatch && jsonMatch[0]) {
//             const jsonString = jsonMatch[0];
//             const aiResponseJson = JSON.parse(jsonString);
//             res.json(aiResponseJson);
//         } else {
//             throw new Error("AI did not return a valid JSON object.");
//         }
//         // --- END OF FIX ---

//     } catch (error) {
//         console.error('AI Price Suggestion Error:', error);
//         res.status(500).json({ error: 'Failed to get price suggestion.' });
//     }
// });

// module.exports = router;










/*
 * This file contains all the Express.js routes related to AI features.
 * It handles requests from the frontend for both price suggestions and
 * description generation by calling the Gemini API.
 */

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Product = require('../models/Product'); // Ensure this path is correct

// --- ROUTE 1: AI Price Suggestion ---
// Handles POST requests to /api/ai/suggest-price
router.post('/suggest-price', async (req, res) => {
    const { fishName, quantity, location, freshness } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const historicalData = await Product.find({ fishName, location })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('price createdAt -_id');

        const prompt = `
            You are an expert fishmonger from the Mangalore Bunder fish market in India. You have deep knowledge of local market prices.
            
            Here are some general baseline market prices per kg in Mangalore:
            - Pomfret: ₹500-₹700
            - Kingfish (Anjal): ₹750-₹950
            - Mackerel (Bangude): ₹250-₹350
            - Tuna: ₹800-₹1200
            - Sardines (Boothai): ₹120-₹180

            A fisherman in ${location} has a new catch with the following details:
            - Fish Name: ${fishName}
            - Quantity: ${quantity}kg
            - Freshness: ${freshness}
            - Today's Date: ${new Date().toLocaleDateString('en-IN')}

            Here is the pricing data for the last few recent sales of ${fishName} in the same area from our platform:
            ${JSON.stringify(historicalData)}

            Considering all of this information, suggest a fair but competitive market price per kg.
            IMPORTANT: If the historical data array is empty, rely more heavily on your expert knowledge and the baseline prices provided. 'Fresh' catches should be priced higher than 'Frozen'.

            Return your answer ONLY in the following JSON format, with no extra text or markdown formatting:
            {
              "suggestedPrice": <number>,
              "reason": "<A brief, one-sentence justification for your price>"
            }
        `;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        };

        const apiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            console.error("Gemini API Error Body:", errorBody);
            throw new Error(`Gemini API call failed with status: ${apiResponse.status}`);
        }
        
        const result = await apiResponse.json();
        const aiResponseText = result.candidates[0].content.parts[0].text;
        res.json(JSON.parse(aiResponseText));

    } catch (error) {
        console.error('AI Price Suggestion Error:', error);
        res.status(500).json({ error: 'Failed to get price suggestion.' });
    }
});

// --- ROUTE 2: AI Description Generation ---
// Handles POST requests to /api/ai/generate-description
router.post('/generate-description', async (req, res) => {
    const { fishName } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const prompt = `
            Create a short, appealing, and professional marketplace description for a fresh catch of "${fishName}". 
            Highlight its quality and suggest one or two popular cooking methods. 
            Keep it under 30 words.
            Return your answer ONLY in the following JSON format:
            {
              "description": "<The generated description>"
            }
        `;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        };

        const apiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) throw new Error(`Gemini API call failed with status: ${apiResponse.status}`);
        
        const result = await apiResponse.json();
        const aiResponseText = result.candidates[0].content.parts[0].text;
        res.json(JSON.parse(aiResponseText));

    } catch (error) {
        console.error('AI Description Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate description.' });
    }
});


// Export the router so it can be used in your main server.js file
module.exports = router;
