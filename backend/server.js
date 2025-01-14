import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// ... other imports remain the same

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const isDev = process.env.NODE_ENV === 'development';

let allowedOrigins;
if (isDev) {
  allowedOrigins = [
    'http://localhost:5180',
    'http://localhost:5178',
    'http://localhost:5173',
    'http://localhost:5179',  
  ];
} else {
  allowedOrigins = [
    process.env.FRONTEND_URL,   
    process.env.ADMIN_URL,
    'https://admin-mc8f.onrender.com',  // Add your Render domain
    'http://admin-mc8f.onrender.com'    // Also allow HTTP version
  ];
}

app.use(cors({
  origin: function (origin, callback) {
    // Add better logging for debugging
    console.log("Request origin:", origin);
    console.log("Allowed origins:", allowedOrigins);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin} is not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'Origin', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// ... rest of your server code remains the same