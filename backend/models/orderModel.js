import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    bentoItems: { type: Array, default: [] }, 
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    deliveryDate: { type: String },         
    deliveryTime: { type: String },         
    status: { type: String, default: "הזמנה התקבלה" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
