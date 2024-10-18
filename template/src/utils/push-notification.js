import { Session } from '../modules/v1/admin/models/session-model';
import { decrypt } from './encrypt';
import FCM from 'fcm-node';

const fcm = new FCM(process.env.FCM_SERVER_KEY);

class PushNotificationController {
    async notification(id, data, type) {
        try {
            const sessions = await Session.find({ user_id: id });
            const uniqueDevices = new Set();

            for (const session of sessions) {
                const sessionData = JSON.parse(decrypt(session.session_token));
                if (sessionData.device_information && sessionData.device_token) {
                    uniqueDevices.add(sessionData);
                }
            }

            uniqueDevices.forEach((deviceInfo) => {
                sendNotification(deviceInfo.device_type, deviceInfo.device_token, data._doc, type);
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export default new PushNotificationController();

const sendNotification = (deviceType, token, data, type) => {
    try {
        console.log('=========== PUSH NOTIFICATION START ============');

        let body = 'Message received';

        switch (Number(type)) {
            case 1:
                body = 'Your KYC details have been verified by admin';
                break;
            case 2:
                body = 'Your KYC details have been verified by admin';
                break;
            default:
                break;
        }

        const message = {
            to: token,
            content_available: true,
            priority: 'high',
        };

        if (deviceType === 'android') {
            message.data = data;
        }

        if (deviceType === 'IOS') {
            message.notification = {
                title: 'FARMSENT',
                body,
                data,
                sound: 'default',
            };
        }

        console.dir(message);

        fcm.send(message, (err, response) => {
            if (err) {
                console.error('Something has gone wrong!', err);
            } else {
                console.log('Successfully sent with response:', response);
            }
        });
    } catch (err) {
        console.error(err);
    }
};
