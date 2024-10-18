import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";

class DeleteCategoryByIdController {

    /**
     * @description API to delete a Category by its ID.
     * @param {*} req /api/v1/admin/delete-category/:id
     * @param {*} res 
     */
    async delete(req, res) {
        try {
            const result = await Category.findByIdAndUpdate(req.params.id);
            if (!result) {
                return responseHandler.errorResponse(res, {}, "Category not found", 404);
            }
            return responseHandler.successResponse(res, {}, "Category deleted successfully", 200);
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new DeleteCategoryByIdController();
