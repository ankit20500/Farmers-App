import { 
    getAllCropsRepo, 
    getCropByIdRepo, 
    createCropRepo, 
    deleteCropRepo, 
    seedCropsRepo 
} from "../Repository/FarmerCropRepository.js";
import { User } from "../Schema/User.js";
import { createCartRepo } from "../Repository/CartRepository.js";

const defaultCropsList = [
  {
    productName: 'Organic Basmati Rice',
    farmerName: 'Ramesh Kumar',
    location: 'Patna, Bihar',
    quantity: 500,
    unit: 'kg',
    price: 75,
    harvestDate: '2026-05-10',
    organic: true,
    description: 'High-quality fragrant long-grain Basmati rice grown using only vermicompost and bio-pesticides.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
    category: 'Grains'
  },
  {
    productName: 'Fresh Yukon Gold Potatoes',
    farmerName: 'Baldev Singh',
    location: 'Amritsar, Punjab',
    quantity: 1200,
    unit: 'kg',
    price: 22,
    harvestDate: '2026-06-01',
    organic: false,
    description: 'Perfectly sized golden potatoes, freshly dug out, sorted, and packed in jute gunny sacks.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600',
    category: 'Vegetables'
  },
  {
    productName: 'Alphonso Mangoes (Hapus)',
    farmerName: 'Sanjay Patil',
    location: 'Ratnagiri, Maharashtra',
    quantity: 300,
    unit: 'dozen',
    price: 450,
    harvestDate: '2026-06-15',
    organic: true,
    description: 'Naturally ripened, extremely sweet Alphonso mangoes direct from geographical indication certified orchards.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600',
    category: 'Fruits'
  },
  {
    productName: 'Desi Red Tomatoes',
    farmerName: 'Sunita Devi',
    location: 'Varanasi, Uttar Pradesh',
    quantity: 400,
    unit: 'kg',
    price: 30,
    harvestDate: '2026-06-18',
    organic: true,
    description: 'Tangy and juicy organic red tomatoes grown without synthetic fertilizers. Hand-picked this week.',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600',
    category: 'Vegetables'
  }
];

const getOrSeedDefaultFarmer = async () => {
    let user = await User.findOne({ email: 'ramesh@krishimart.com' });
    if (!user) {
        user = await User.create({
            name: 'Ramesh Kumar',
            email: 'ramesh@krishimart.com',
            password: 'password123',
            contactNumber: 9876543210,
            role: 'user'
        });
        await createCartRepo(user._id);
    }
    return user;
}

export const getAllCropsService = async (filters = {}) => {
    try {
        let crops = await getAllCropsRepo(filters);
        if (crops.length === 0 && !filters.search && filters.organic === 'All' && !filters.farmerId) {
            // Seed default crops
            const farmerUser = await getOrSeedDefaultFarmer();
            const seededCrops = defaultCropsList.map(crop => ({
                ...crop,
                farmer: farmerUser._id
            }));
            await seedCropsRepo(seededCrops);
            crops = await getAllCropsRepo(filters);
        }
        return crops;
    } catch (error) {
        throw error;
    }
}

export const getCropByIdService = async (id) => {
    try {
        return await getCropByIdRepo(id);
    } catch (error) {
        throw error;
    }
}

export const createCropService = async (userId, cropData) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("Farmer user not found");
        
        const finalCropData = {
            ...cropData,
            farmer: user._id,
            farmerName: user.name
        };
        return await createCropRepo(finalCropData);
    } catch (error) {
        throw error;
    }
}

export const deleteCropService = async (userId, id) => {
    try {
        const crop = await getCropByIdRepo(id);
        if (!crop) throw new Error("Crop listing not found");
        
        // Only owner or admin can delete
        const user = await User.findById(userId);
        if (crop.farmer.toString() !== userId && user.role !== 'admin') {
            throw new Error("Unauthorized to delete this listing");
        }
        
        return await deleteCropRepo(id);
    } catch (error) {
        throw error;
    }
}
