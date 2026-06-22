import { 
    getAllCropsService, 
    getCropByIdService, 
    createCropService, 
    deleteCropService 
} from "../service/FarmerCropService.js";
import { errorHandler, successHandler } from "../Utility/Handler.js";

export const getAllCropsController = async (req, res) => {
    try {
        const filters = {
            search: req.query.search,
            organic: req.query.organic,
            maxPrice: req.query.maxPrice,
            category: req.query.category,
            farmerId: req.query.farmerId
        };
        const crops = await getAllCropsService(filters);
        return successHandler(res, 200, "Crops fetched successfully", crops);
    } catch (error) {
        return errorHandler(res, 500, error.message, error);
    }
}

export const getCropByIdController = async (req, res) => {
    try {
        const crop = await getCropByIdService(req.params.id);
        if (!crop) {
            return errorHandler(res, 404, "Crop listing not found", {});
        }
        return successHandler(res, 200, "Crop details fetched successfully", crop);
    } catch (error) {
        return errorHandler(res, 500, error.message, error);
    }
}

export const createCropController = async (req, res) => {
    try {
        const userId = req.user.id;
        const crop = await createCropService(userId, req.body);
        return successHandler(res, 201, "Crop listed successfully", crop);
    } catch (error) {
        return errorHandler(res, 400, error.message, error);
    }
}

export const deleteCropController = async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await deleteCropService(userId, req.params.id);
        return successHandler(res, 200, "Crop listed deleted successfully", response);
    } catch (error) {
        return errorHandler(res, 400, error.message, error);
    }
}
