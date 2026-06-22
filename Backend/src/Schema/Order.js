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
                    ref:'Products'
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
        default:'Pending',
        enum:['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    addressSnapshot:{
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        fullAddress: { type: String, required: true },
        landmark: { type: String, default: "" }
    },
    paymentMethod:{
        type:String,
        default:'CASH',
        enum:['ONLINE', 'CASH', 'UPI', 'WALLET', 'CARD']
    },
    paymentStatus:{
        type:String,
        default:'Pending',
        enum:['Pending', 'Paid', 'Failed']
    },
    paymentDetails: {
        transactionId: { type: String },
        paymentMethod: { type: String },
        paymentStatus: { type: String },
        timestamp: { type: Date }
    }
},{timestamps:true});

export const Order=mongoose.model('Order',orderSchema);