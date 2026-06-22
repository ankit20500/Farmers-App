import { FarmerCrop } from "../Schema/FarmerCrop.js";

export const getAllCropsRepo = async (filters = {}) => {
    try {
        const query = {};
        
        if (filters.search) {
            query.$or = [
                { productName: { $regex: filters.search, $options: 'i' } },
                { farmerName: { $regex: filters.search, $options: 'i' } },
                { location: { $regex: filters.search, $options: 'i' } }
            ];
        }
        
        if (filters.organic !== undefined && filters.organic !== 'All') {
            query.organic = filters.organic === 'Organic' || filters.organic === true;
        }
        
        if (filters.maxPrice) {
            query.price = { $lte: Number(filters.maxPrice) };
        }

        if (filters.category) {
            query.category = filters.category;
        }

        if (filters.farmerId) {
            query.farmer = filters.farmerId;
        }
        
        return await FarmerCrop.find(query).sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
}

export const getCropByIdRepo = async (id) => {
    try {
        return await FarmerCrop.findById(id);
    } catch (error) {
        throw error;
    }
}

export const createCropRepo = async (cropData) => {
    try {
        return await FarmerCrop.create(cropData);
    } catch (error) {
        throw error;
    }
}

export const deleteCropRepo = async (id) => {
    try {
        return await FarmerCrop.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

export const seedCropsRepo = async (crops) => {
    try {
        return await FarmerCrop.insertMany(crops);
    } catch (error) {
        throw error;
    }
}
