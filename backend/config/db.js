import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, 
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};
