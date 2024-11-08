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

app.post('/create-checkout-session', async (req, res) => {
  try {
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: req.body.items.map(item => ({
              price_data: {
                  currency: 'inr',
                  product_data: { name: item.name },
                  unit_amount: item.price * 100,
              },
              quantity: item.quantity,
          })),
          mode: 'payment',
          success_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });

      res.json({ id: session.id });
  } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on backend URL: ${baseUrl}:${port}`);
  console.log(`Frontend URL set to: ${frontendUrl}`);
});