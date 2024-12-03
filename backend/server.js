import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import bentoRouter from './routes/bentoRouter.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const isDev = process.env.NODE_ENV === 'development';

let allowedOrigins;
if (isDev) {
  allowedOrigins = [
    'http://localhost:5179',
    'http://localhost:5180',
    'http://localhost:5175',
    'http://localhost:5174',  
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

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
