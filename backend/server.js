import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import app from './app.js'; // Assuming app.js sets up additional middleware and routes

dotenv.config();

const port = process.env.PORT || 4000;
const baseUrl = process.env.BASE_URL;
const frontendUrl = process.env.FRONTEND_URL;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Enable CORS for the frontend URL
app.use(cors({
  origin: frontendUrl,
  credentials: true,
}));

// Stripe Checkout Session Route
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  // Check for items structure
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid items format' });
  }

  // Map items to Stripe line item format
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100, // Stripe expects the price in smallest currency unit (e.g., cents)
    },
    quantity: item.quantity,
  }));

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cart`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on backend URL: ${baseUrl}:${port}`);
  console.log(`Frontend URL set to: ${frontendUrl}`);
});