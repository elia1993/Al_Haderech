import dotenv from 'dotenv'; 
import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// CORS configuration
app.use(cors({
  origin: 'http://yourfrontend.com', // Change this to your frontend URL, e.g., 'http://localhost:3000' for local development
  methods: 'GET,POST,PUT,DELETE',    // Specify allowed methods
  allowedHeaders: 'Content-Type, Authorization' // Specify allowed headers (optional)
}));

// middlewares
app.use(express.json())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

console.log("API Routes Registered:");
console.log("/api/user");
console.log("/api/food");
console.log("/api/cart");
console.log("/api/order");

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
