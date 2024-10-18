import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";

class UpdateCategoryByIdController {


    /**
     * @description API to update a Category by its ID.
     * @param {*} req /api/v1/admin/update-category/:id
     * @param {*} res 
     */
    async update(req, res) {
        try {

            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-user_id');
            if (!category) {
                return responseHandler.errorResponse(res, {}, "Category not found", 404);
            }

            return responseHandler.successResponse(res, category, "Category updated successfully", 200);
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new UpdateCategoryByIdController();
