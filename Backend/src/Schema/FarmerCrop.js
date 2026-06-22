import mongoose from "mongoose";

const farmerCropSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmerName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Grains',
        enum: ['Grains', 'Vegetables', 'Fruits', 'Pulses', 'Oilseeds']
    },
    location: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'quintal', 'ton', 'dozen']
    },
    price: {
        type: Number,
        required: true
    },
    harvestDate: {
        type: String,
        required: true
    },
    organic: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const FarmerCrop = mongoose.model('FarmerCrop', farmerCropSchema);
