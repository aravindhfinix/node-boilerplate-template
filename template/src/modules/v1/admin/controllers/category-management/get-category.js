import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";

class GetCategoryByIdController {


    /**
     * @description API to retrieve a Category by its ID.
     * @param {*} req /api/v1/admin/category/:id
     * @param {*} res 
     */
    async get(req, res) {
        try {
            const result = await Category.findById(req.params.id);
            if (!result) {
                return responseHandler.errorResponse(res, {}, "Category not found", 400);
            }
            return responseHandler.successResponse(res, result, "Category retrieved successfully", 200);
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new GetCategoryByIdController();
