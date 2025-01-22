import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    category:{     // main category of the product
        type:String,
        required:[true,'product category is required']
    },
    subcategories:[   // sub-category of the product
        {
            name:{
                type:String,
                required:[true,'product subcategory name is required']
            },
            // each product details
            products:[
                {
                    name:{
                        type:String,
                        required:[true,'product name is required'],
                        maxLength:[20,'name should not greater than 20 character'],
                        minLength:[3,'name should not less than 3 character'],
                        trim:true
                    },
                    description:{
                        type:String,
                        required:[true,'product description is required'],
                        minLength:[5,'product description must be atleast 5 characters']
                    },
                    price:{
                        type:Number,
                        required:[true,'product price is required'],
                    },
                    image:{
                        type:String,
                        required:[true,'product image is required']
                    },
                    stock:{
                        type:Number,
                        required:[true,'in stock status is required'],
                        min:[0,"stock cannot be negative"],
                        default:1
                    },
                    // review section is started
                    reviews:[
                        {
                            user:{
                                type:mongoose.Schema.Types.ObjectId,
                                ref:'User',
                                required:[true,'please login for review the product']
                            },
                            rating:{
                                type:Number,
                                required:[true,'rating is required for review the product'],
                                min:[0,'rating is not less that 0'],
                                max:[5,'review is not greater than 5'],
                            },
                            comment:{
                                type:String,
                                required:[true,'comment is necessary if you want to give reviews']
                            }
                        }
                    ]
                }
            ]
        }
    ]
},{timestamps:true});

export const Products=mongoose.model('Products',productSchema);