import mongoose from 'mongoose';

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:'Product'
                },
                quantity:{
                    type:Number,
                    required:true,
                    default:1
                }
            }
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:'ORDERED',
        enum:['ORDERED','CANCELLED','SHIPPED','DELIVERED','PROCESSING','OUT_FOR_DELIVERY']
    },
    address:{
        type:String,
        minLength:[10,'Address should be of atleast 10 characters'],
        required:true
    },
    paymentMethod:{
        type:String,
        default:'CASH',
        enum:['ONLINE','CASH']
    }
},{timestamps:true});

export const Order=mongoose.model('Order',orderSchema);