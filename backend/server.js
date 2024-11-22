import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Load environment variables
dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 4000;  // Default to 4000 for local, but use the dynamic port on Render

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Log API routes
console.log('API Routes Registered:');
console.log('/api/user');
console.log('/api/food');
console.log('/api/cart');
console.log('/api/order');

// Root endpoint
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
