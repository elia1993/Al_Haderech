import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Determine environment
const isDev = process.env.NODE_ENV === 'development';
console.log('Environment:', process.env.NODE_ENV);

// Define allowed origins based on environment
const allowedOrigins = isDev 
  ? [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5178',
      'http://localhost:5179',
      'http://localhost:5180',
    ]
  : [
      'https://admin-mc8f.onrender.com',
      'http://admin-mc8f.onrender.com',
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
    ];

// Debug logging
console.log('Allowed Origins:', allowedOrigins);

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    console.log('Request Origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'Origin', 'Accept'],
}));

// Debug middleware
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Origin:', req.headers.origin);
  next();
});

// ... rest of your server code