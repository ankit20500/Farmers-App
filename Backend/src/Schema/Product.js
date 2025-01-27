import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:[true,"product name is required"],
        maxLength:[50,"product name must be less than 50 words"],
        minLength:[3,"product name must be more than 3 words"],
        lowercase:true
    },
    category:{
        type:String,
        required:[true,'product category is required'],
        lowercase:true
    },
    subcategory:{
        type:String,
        required:[true,"product sub-category is required"],
        lowercase:true
    },
    description:{
        type:String,
        required:[true,"product description is required"]
    },
    price:{
        type:Number,
        required:[true,"product price is required"]
    },
    stock:{
        type:Number,
        default:1
    },
    ratings:{
        type:Number,
        max:[5,"ratings must be less than or equals to 5"],
        min:[0,"ratings must be greater than or equals to 0"],
        default:0
    },
    image:{
        type:String,
        required:[true,"product image is required"]
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:[true,"Please login for review the product"]
            },
            comment:{
                type:String,
                required:[true,"comment is required for reviewing"]
            },
            rating:{
                type:Number,
                required:[true,"please rate the product"]
            }
        }
    ]
},{timestamps:true});

export const Products=mongoose.model('Products',productSchema);