import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";


class CreateCategoryController {

    /**
    * @description API to create a new Category.
    * @param {*} req /api/v1/admin/category
    * @param {*} res 
    */

    async create(req, res) {

        try {
            const result = await Category.create(req.body);
            if (result) {
                return responseHandler.successResponse(res, result, "category created successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'creation failed', 400);
            }

        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new CreateCategoryController();

