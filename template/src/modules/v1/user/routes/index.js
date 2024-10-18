import express from 'express';
import signUpUser from '../controllers/user-management/sign-up-user';
import loginUser from '../controllers/user-management/login-user';
import updateUser from '../controllers/user-management/update-user';
import getUser from '../controllers/user-management/get-user';
import sendVerificationLink from '../controllers/user-management/send-verification-link';
import sendForgetPasswordLink from '../controllers/user-management/send-forget-password-link';
import verifyEmail from '../controllers/user-management/verify-email';
import paramsValidator from '../../admin/validators/params-validator';
import userValidator from '../validators/user-validator';
import resetPassword from '../controllers/user-management/reset-password';
import logout from '../controllers/user-management/logout';
import userAuthentication from '../authentication/user-authentication';


const userRouter = express.Router();

/**
 * user routes
 * @description user routes
 */

//user routes
userRouter.post('/signup', [userValidator.signup], signUpUser.create);
userRouter.post('/login', [userValidator.login], loginUser.get);
userRouter.get('/send-verification-mail', sendVerificationLink.update);
userRouter.get('/send-forgot-password-mail', sendForgetPasswordLink.update);
userRouter.patch('/verify-email/:id', [paramsValidator.validate], verifyEmail.update);
userRouter.patch('/update/:id', [paramsValidator.validate, userValidator.update], updateUser.update);
userRouter.get('/details/:id', [userAuthentication.check, paramsValidator.validate], getUser.get);
userRouter.patch('/reset-password/:id', [paramsValidator.validate], resetPassword.update);
userRouter.delete('/logout', logout.delete);

module.exports = userRouter;