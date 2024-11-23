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

const app = express();
const port = process.env.PORT || 4000;

// Check if running in development or production
const isDev = process.env.NODE_ENV === 'development';

// Set CORS origin dynamically based on environment
let allowedOrigins;
if (isDev) {
  allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; // Local dev URLs for frontend and admin site
} else {
  allowedOrigins = [process.env.FRONTEND_URL]; // Allow the production frontend URL
}

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Middlewares
app.use(express.json());

// Database connection
connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

console.log("API Routes Registered:");
console.log("/api/user");
console.log("/api/food");
console.log("/api/cart");
console.log("/api/order");

// Root route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
