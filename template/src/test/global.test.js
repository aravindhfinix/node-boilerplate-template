import server from '../index';
import { runAdminTests } from './admin/admin-management';
import { mongoose, redis } from './../config/index';
import { runUserManagementTests } from './admin/user-management';
import { runDeleteTests } from './admin/delete-admin-test';
import { runUserTests } from './user/user-management';


describe('User API Tests', () => {
    runUserTests(server)
});

describe('Admin API Tests', () => {
    runAdminTests(server);
    runUserManagementTests(server)
    runDeleteTests(server)
});


afterAll(async () => {
    await mongoose.disconnectDB();
    await redis.disconnect();
    await server.close();
});