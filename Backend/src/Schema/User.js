import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[20,'Name cannot exceed 20 character'],
        minLength:[3,'Name connot less than 3 character']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    contactNumber: {
        type: Number,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number'],
        default: null, 
        unique:false
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[6,'Password must be atleast 6 characters long'],
    },
    image:{
        type:String,
        default:null
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

userSchema.pre('save',async function(){
    const hashPassword=await bcrypt.hash(this.password,10);
    this.password=hashPassword;
})

export const User=mongoose.model('User',userSchema);

