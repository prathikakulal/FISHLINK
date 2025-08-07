

/*
 * This file contains all the Express.js routes related to AI features.
 */

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
// const Product = require('../models/Product'); // Ensure this path is correct
const Catch = require('../models/Catch'); 

// --- ROUTE 1: AI Price Suggestion ---
router.post('/suggest-price', async (req, res) => {
    const { fishName, quantity, location, freshness } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const historicalData = await Product.find({ fishName, location }).sort({ createdAt: -1 }).limit(5).select('price createdAt -_id');
        const prompt = `You are an expert fishmonger from Mangalore. Baseline prices/kg: Pomfret: ₹600, Kingfish: ₹850, Mackerel: ₹300, Tuna: ₹1000. A fisherman in ${location} has a ${quantity}kg catch of ${freshness} ${fishName}. Recent sales: ${JSON.stringify(historicalData)}. Suggest a competitive price per kg. If no sales data, use your expert knowledge. Return ONLY JSON: {"suggestedPrice": <number>, "reason": "<brief justification>"}`;
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        };
        const apiResponse = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!apiResponse.ok) throw new Error(`Gemini API call failed: ${apiResponse.status}`);
        const result = await apiResponse.json();
        res.json(JSON.parse(result.candidates[0].content.parts[0].text));
    } catch (error) {
        console.error('AI Price Suggestion Error:', error);
        res.status(500).json({ error: 'Failed to get price suggestion.' });
    }
});

// --- ROUTE 2: AI Description Generation (UPDATED) ---
router.post('/generate-description', async (req, res) => {
    // Now accepts existingDescription from the frontend
    const { fishName, existingDescription } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        // The prompt is updated to be more intelligent
        const prompt = `
            You are a marketing expert for a seafood marketplace.
            A user is writing a description for a fresh catch of "${fishName}".
            Their current draft is: "${existingDescription}".

            Your task is to enhance this description. If the draft is empty, create a new one from scratch. If it has content, refine it to be more appealing and professional.
            The final description should highlight quality, suggest cooking methods, and be under 70 words.
            Return your answer ONLY in the following JSON format:
            {
              "description": "<The final, enhanced description>"
            }
        `;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        };

        const apiResponse = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!apiResponse.ok) throw new Error(`Gemini API call failed: ${apiResponse.status}`);
        
        const result = await apiResponse.json();
        res.json(JSON.parse(result.candidates[0].content.parts[0].text));
    } catch (error) {
        console.error('AI Description Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate description.' });
    }
});

module.exports = router;
