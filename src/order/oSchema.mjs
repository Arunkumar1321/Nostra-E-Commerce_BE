import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    cartItems:Array,
    amount:Number,
    status:String,
    createdAt:Date
})
const ordermodel=mongoose.model("order",OrderSchema)
export default ordermodel