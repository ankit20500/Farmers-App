import mongoose from 'mongoose';

const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        unique:true
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
    ]
},{timestamps:true})

export const Cart=mongoose.model('Cart',CartSchema);
