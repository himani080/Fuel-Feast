import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import app from './app.js';

const port = process.env.PORT || 4000;
const baseUrl = process.env.BASE_URL;
const frontendUrl = process.env.FRONTEND_URL;

// Enable CORS specifically for the frontend URL
app.use(cors({
  origin: frontendUrl,
  credentials: true, // Include credentials if necessary (e.g., for cookies)
}));

app.listen(port, () => {
  console.log(`Server is running on backend URL: ${baseUrl}:${port}`);
  console.log(`Frontend URL set to: ${frontendUrl}`);
});
