import { responseHandler } from "../../../../../utils/response-handler";


class ClearCollectionController {

  

    /**
     * @description   api to clear collection
     * @param {*} req http://localhost:3000/api/v1/admin/clear/
     * @param {*} res 
     */

    delete(req, res) {

        try {
            responseHandler.errorResponse(res, {}, 'api not in use', 400)
            // User.deleteMany({name:'mona'}).exec((err, result) => {
            //     if (err) return responseHandler.errorResponse(res, err);
            //     if (result) {
            //         return responseHandler.successResponse(res, result, 'collection deleted successfully');
            //     } else {
            //         return responseHandler.errorResponse(res, {}, "collection details not found", 400);
            //     }
            // })
        }

        catch (err) {
            responseHandler.errorResponse(res, err);
        }

    }
}


export default new ClearCollectionController();


