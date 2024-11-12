// // // const express = require('express');
// // // const bodyParser = require('body-parser');
// // // const cors = require('cors');
// // // const { GoogleGenerativeAI } = require('@google/generative-ai');
// // // require('dotenv').config();

// // // const app = express();
// // // const PORT = process.env.BASE2_URL || 3001;
// // // const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// // // app.use(bodyParser.json());

// // // // Enable CORS only for the specified frontend URL
// // // app.use(cors({
// // //     origin: 'http://localhost:4000',
// // //     credentials: true, // If using cookies or authentication
// // //     methods: "GET,POST,PUT,DELETE", // Specify allowed methods
// // //     allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
// // // }));

// // // const genAI = new GoogleGenerativeAI(process.env.api_generative_ai);

// // // app.post('/generate', async (req, res) => {
// // //     const prompt = req.body.prompt;
// // //     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
// // //     const completePrompt = `You are a fitness coach and I want you to give a solution to my problem: '${prompt}'.`;

// // //     try {
// // //         const result = await model.generateContent(completePrompt);
// // //         const text = await result.response.text();
// // //         res.json({ text });
// // //     } catch (error) {
// // //         console.error('Error generating content:', error);
// // //         res.status(500).json({ error: 'An error occurred. Please try again.' });
// // //     }
// // // });

// // // app.listen(CHATBOT_PORT, () => {
// // //     console.log(`Server running at backend URL: http://localhost:${PORT}`);
// // // });

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const { GoogleGenerativeAI } = require('@google/generative-ai');
// // require('dotenv').config();

// // const app = express();
// // const CHATBOT_PORT = process.env.CHATBOT_PORT || 3001; // Ensure using CHATBOT_PORT from .env
// // const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; // Frontend URL
// // const BASE_URL = process.env.BASE_URL || 'http://localhost:4000'; // Base URL for frontend

// // app.use(bodyParser.json());

// // // Enable CORS only for the frontend URL on port 4000
// // app.use(cors({
// //     origin: [FRONTEND_URL, BASE_URL],  // Allow both frontend and backend
// //     credentials: true,
// //     methods: "GET,POST,PUT,DELETE",
// //     allowedHeaders: "Content-Type,Authorization",
// //   }));
  

// // const genAI = new GoogleGenerativeAI(process.env.api_generative_ai); // Your API key for Google Generative AI

// // // POST route to generate content using the AI
// // app.post('/generate', async (req, res) => {
// //     const prompt = req.body.prompt;
// //     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Model for content generation
// //     const completePrompt = `You are a fitness coach, and I want you to give a solution to my problem: '${prompt}'.`;

// //     try {
// //         const result = await model.generateContent(completePrompt);
// //         const text = await result.response.text();
// //         res.json({ text });  // Send the AI-generated response back
// //     } catch (error) {
// //         console.error('Error generating content:', error);
// //         res.status(500).json({ error: 'An error occurred. Please try again.' });
// //     }
// // });

// // // Start the server
// // app.listen(CHATBOT_PORT, () => {
// //     console.log(`Chatbot server is running at http://localhost:${CHATBOT_PORT}`);
// // });

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// require('dotenv').config();

// const app = express();
// const CHATBOT_PORT = process.env.CHATBOT_PORT || 3001; // Ensure using CHATBOT_PORT from .env
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; // Frontend URL
// const BASE_URL = process.env.BASE_URL || 'http://localhost:4000'; // Base URL for frontend

// app.use(bodyParser.json());

// // Enable CORS only for the frontend URL on port 4000
// app.use(cors({
//     origin: [FRONTEND_URL, BASE_URL],  // Allow both frontend and backend
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   }));
  

// const genAI = new GoogleGenerativeAI(process.env.api_generative_ai); // Your API key for Google Generative AI

// // POST route to generate content using the AI
// app.post('/generate', async (req, res) => {
//     const prompt = req.body.prompt;
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Model for content generation
//     const completePrompt = `You are a fitness coach, and I want you to give a solution to my problem: '${prompt}'.`;

//     try {
//         const result = await model.generateContent(completePrompt);
//         const text = await result.response.text();
//         res.json({ text });  // Send the AI-generated response back
//     } catch (error) {
//         console.error('Error generating content:', error);
//         res.status(500).json({ error: 'An error occurred. Please try again.' });
//     }
// });

// // Start the server
// app.listen(CHATBOT_PORT, () => {
//     console.log(`Chatbot server is running at http://localhost:${CHATBOT_PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const CHATBOT_PORT = process.env.CHATBOT_PORT || 3001;  // Ensure using CHATBOT_PORT from .env
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';  // Frontend URL
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';  // Base URL for frontend

app.use(bodyParser.json());

// Enable CORS only for the frontend URL and backend URL on port 4000
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4000'],  // Allow frontend (5173) and backend (4000) requests
    credentials: true, // Allow cookies or credentials
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));


const genAI = new GoogleGenerativeAI(process.env.api_generative_ai);  // Your API key for Google Generative AI

// POST route to generate content using the AI
app.post('/generate', async (req, res) => {
    console.log('Request received at /generate endpoint');
    const prompt = req.body.prompt;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });  // Model for content generation
    const completePrompt = `You are a fitness coach, and I want you to give a solution to my problem: '${prompt}'.`;

    try {
        const result = await model.generateContent(completePrompt);
        const text = await result.response.text();
        res.json({ text });  // Send the AI-generated response back
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

// Start the server
app.listen(CHATBOT_PORT, () => {
    console.log(`Chatbot server is running at http://localhost:${CHATBOT_PORT}`);
});
