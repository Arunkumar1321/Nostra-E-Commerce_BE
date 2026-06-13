import mongoose from "mongoose";
const ProductSchema= new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    ratings:Number,
    image:String,
    category:String,
    seller:String,
    stock:Number,
    numOfReviews:Number,
    createdAt:Date
})
export const productModel=mongoose.model("product",ProductSchema)