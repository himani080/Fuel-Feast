// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import app from './app.js'; // Assumes app.js is setting up additional middleware and routes

dotenv.config();

const port = process.env.PORT || 4000;
const frontendUrl = process.env.FRONTEND_URL;

// Enable CORS for the frontend URL
app.use(cors({
  origin: frontendUrl,
  credentials: true,
}));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Frontend URL set to: ${frontendUrl}`);
});