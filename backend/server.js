import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import bentoRouter from './routes/bentoRouter.js';
import analyticsRoutes from './routes/analytics.js';
import Visit from './models/Visit.js'; // Import Visit model

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const isDev = process.env.NODE_ENV === 'development';

let allowedOrigins;
if (isDev) {
  allowedOrigins = [
    'http://localhost:5174',
    'http://localhost:5178',
    'http://localhost:5173',
    'http://localhost:5179',  
  ];
} else {
  allowedOrigins = [
    process.env.FRONTEND_URL,   
    process.env.ADMIN_URL,      
  ];
}

app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin:", origin); 
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin); 
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization, token',
}));

app.use(express.json());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/bentos", bentoRouter);
app.use('/api/analytics', analyticsRoutes);

// Track a visit when someone accesses any route (use middleware)
app.use(async (req, res, next) => {
  // Skip visit tracking for analytics routes
  if (req.originalUrl.startsWith('/api/analytics')) {
    return next(); // Skip tracking and move to next middleware
  }

  try {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // e.g., "2024-12-03"

    let visit = await Visit.findOne({ date: dateString });

    if (visit) {
      visit.count += 1;
      await visit.save();
    } else {
      visit = new Visit({ date: today, count: 1 });
      await visit.save();
    }

    next();
  } catch (error) {
    console.error('Error tracking visit:', error);
    next();
  }
});


app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
