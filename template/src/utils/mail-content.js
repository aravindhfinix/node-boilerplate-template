import mailSender from "./mail-sender";


class MailContent {
    async verificationMail(user) {
        try {
            const url = `http://${process.env.MONGODB_HOST}/layeroneX/verification?token=${user.reset_token}&id=${user._id}`;
            const subject = 'Verify Your Email Address';
            const content = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Verify Your Email Address</title>
            </head>
            <body style="background-color: #F5F5F5; font-family: Arial, sans-serif; color: #333333; line-height: 1.5; margin: 0; padding: 0;">
                <h1 style="color: #333333; font-weight: bold; line-height: 1.2; margin: 0; padding: 0;">Please verify your email address</h1>
                <p>Dear ${user.name},</p>
                <p>Thank you for signing up for our service. Before we can activate your account, we need to verify your email address. Please click on the link below to complete the verification process:</p>
                <a href="${url}" style="color: #008000; text-decoration: none;">Verify My Email Address</a>
                <p>If the link does not work, you can copy and paste the following URL into your browser:</p>
                <p style="margin: 0; padding: 0;">${url}</p>
                <p>Please note that this link is valid for 24 hours only. After that, you will need to request another verification link.</p>
                <p>Thank you for your cooperation. If you have any questions, please don't hesitate to contact our support team.</p>
                <p style="margin: 0; padding: 0;">Best regards,</p>
                <p style="margin: 0; padding: 0;">[Your company name]</p>
            </body>
            </html>
            `;
            const success = await mailSender.sendEmail(user.email, subject, content);
            console.log(`Verification email sent to ${user.email}`);
            return success
        } catch (error) {
            console.error(`Failed to send verification email to ${user.email}:`, error);
            throw error; // re-throw the error to the caller
        }
    }

    async forgetPassword(user) {
        try {
            const url = `http://${process.env.MONGODB_HOST}/layeroneX/verification?token=${user.reset_token}&id=${user._id}`;
            const subject = 'Verify Your Email Address';
            const content = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Forgot Your Password?</title>
            </head>
            <body style="background-color: #F5F5F5; font-family: Arial, sans-serif; color: #333333; line-height: 1.5; margin: 0; padding: 0;">
                <h1 style="color: #333333; font-weight: bold; line-height: 1.2; margin: 0; padding: 0;">Forgot Your Password?</h1>
                <p>Dear ${user.name},</p>
                <p>We received a request to reset your password. Please click on the link below to create a new password:</p>
                <a href="${url}" style="color: #008000; text-decoration: none;">Reset My Password</a>
                <p>If the link does not work, you can copy and paste the following URL into your browser:</p>
                <p style="margin: 0; padding: 0;">${url}</p>
                <p>Please note that this link is valid for 24 hours only. After that, you will need to request another password reset.</p>
                <p>Thank you for your cooperation. If you have any questions, please don't hesitate to contact our support team.</p>
                <p style="margin: 0; padding: 0;">Best regards,</p>
                <p style="margin: 0; padding: 0;">[Your company name]</p>
            </body>
            </html>`;
            const success = await mailSender.sendEmail(user.email, subject, content);
            console.log(`Verification email sent to ${user.email}`);
            return success
        } catch (error) {
            console.error(`Failed to send verification email to ${user.email}:`, error);
            throw error; 
        }
    }

    async passwordResetSuccess(user) {
        try {
            const url = `http://${process.env.MONGODB_HOST}/layeroneX/verification?token=${user.reset_token}&id=${user._id}`;
            const subject = 'Verify Your Email Address';
            const content = `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset Successful</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 20px auto; background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #333;">Password Reset Successful, ${user.name}</h2>
                    <p>Dear ${user.name},</p>
                    <p>Your password has been successfully reset. You can now log in using your new password.</p>
                    <p>If you did not request this password reset, please contact our support team immediately.</p>
                    <p>Thank you for using our services!</p>
                    <p>Best regards,<br>Your Company Name</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #333; padding: 10px; text-align: center;">
                    <p style="color: #fff; margin: 0;">© 2023 Your Company Name. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            
            `;
            const success = await mailSender.sendEmail(user.email, subject, content);
            console.log(`Verification email sent to ${user.email}`);
            return success
        } catch (error) {
            console.error(`Failed to send verification email to ${user.email}:`, error);
            throw error; // re-throw the error to the caller
        }
    }

}

export default new MailContent();

