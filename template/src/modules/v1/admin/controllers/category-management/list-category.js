import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";

class GetAllCategorysController {


    /**
     * @description API to retrieve a list of all Categorys.
     * @param {*} req /api/v1/admin/categorys
     * @param {*} res 
     */
    async list(req, res) {
        try {
            const results = await Category.find();

            return responseHandler.successResponse(res, results, "Categorys retrieved successfully", 200);
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new GetAllCategorysController();
