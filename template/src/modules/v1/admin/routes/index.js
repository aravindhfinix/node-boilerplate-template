import express from 'express';
//validators
import paramsValidator from '../validators/params-validator';
import signupAdmin from '../controllers/admin-management/signup-admin';
import loginAdmin from '../controllers/admin-management/login-admin';
import getAdmin from '../controllers/admin-management/get-admin';
import listAdmin from '../controllers/admin-management/list-admin';
import updateAdmin from '../controllers/admin-management/update-admin';
import adminValidator from '../validators/admin-validator';
import deleteAdmin from '../controllers/admin-management/delete-admin';
import listUser from '../controllers/user-management/list-user';
import getUser from '../../user/controllers/user-management/get-user';
import deleteUser from '../controllers/user-management/delete-user';
import unblockUser from '../controllers/user-management/unblock-user';
import blockUser from '../controllers/user-management/block-user';
import acceptKycDetails from '../controllers/user-management/accept-kyc-details';
import rejectKycDetails from '../controllers/user-management/reject-kyc-details';
import logout from '../../user/controllers/user-management/logout';
import adminAuthentication from '../authentication/admin-authentication';
import createCategory from '../controllers/category-management/create-category';
import listCategory from '../controllers/category-management/list-category';
import categoryValidator from '../validators/category-validator';
import getCategory from '../controllers/category-management/get-category';
import deleteCategory from '../controllers/category-management/delete-category';
import updateCategory from '../controllers/category-management/update-category';


const adminRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//admin management routes
adminRouter.post('/signup', [adminValidator.signup], signupAdmin.create);
adminRouter.post('/login', [adminValidator.login], loginAdmin.get);
adminRouter.get('/details/:id', [adminAuthentication.check, paramsValidator.validate], getAdmin.get);
adminRouter.get('/list', [adminAuthentication.check], listAdmin.list)
adminRouter.patch('/update/:id', [adminAuthentication.check, paramsValidator.validate, adminValidator.update], updateAdmin.update)
adminRouter.delete('/delete/:id', [adminAuthentication.check, paramsValidator.validate], deleteAdmin.delete)
adminRouter.delete('/logout', [adminAuthentication.check], logout.delete);

//category routes
adminRouter.post('/category', [adminAuthentication.check, categoryValidator.create], createCategory.create)
adminRouter.get('/categorys', [adminAuthentication.check], listCategory.list)
adminRouter.get('/category/:id', [adminAuthentication.check], paramsValidator.validate, getCategory.get)
adminRouter.patch('/category/:id', [adminAuthentication.check, categoryValidator.update], categoryValidator.update, updateCategory.update)
adminRouter.delete('/category/:id', [adminAuthentication.check], paramsValidator.validate, deleteCategory.delete)

//user management
adminRouter.get('/list-users', [adminAuthentication.check], listUser.list);
adminRouter.get('/user-details/:id', [paramsValidator.validate], getUser.get)
adminRouter.delete('/delete-user/:id', [paramsValidator.validate], deleteUser.delete);
adminRouter.patch('/block-user/:id', [paramsValidator.validate], blockUser.update);
adminRouter.patch('/unblock-user/:id', [paramsValidator.validate], unblockUser.update);
adminRouter.patch('/accept-user-kyc/:id', [paramsValidator.validate], acceptKycDetails.update);
adminRouter.patch('/reject-user-kyc/:id', [paramsValidator.validate], rejectKycDetails.update);


module.exports = adminRouter;