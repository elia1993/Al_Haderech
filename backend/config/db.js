import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, 
    });
    console.log("DB Connected");
    console.log(`Connected to DB: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};
