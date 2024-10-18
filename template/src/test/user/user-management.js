import request from 'supertest';
import { USER } from '../constant';

export const runUserTests = (server) => {

    describe('User Signup API', () => {
        it('Signs up a user successfully', async () => {
            const response = await request(server)
                .post('/api/v1/user/signup')
                .send(USER.validUserSignup)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(200);
        });

        it('Handles incorrect signup credentials gracefully', async () => {
            const response = await request(server)
                .post('/api/v1/user/signup')
                .send(USER.invalidUserSignup)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(400);
        });
    });


    describe('User login', () => {
        it('Login user successfully', async () => {
            const response = await request(server)
                .post('/api/v1/user/login')
                .send(USER.validLoginPayload)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(200);
            global.userId = response.body.data.user._id;
            global.userToken = response.body.data.session.session_token;
        });

        it('Handles incorrect login credentials gracefully', async () => {
            const response = await request(server)
                .post('/api/v1/admin/login')
                .send(USER.invalidLoginPayload)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(400);
        });
    });

    describe('User details', () => {
        it('Retrieves a user by valid token', async () => {
            const response = await request(server)
                .get(`/api/v1/user/details/${global.userId}`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.userToken}`);

            expect(response.status).toBe(200);
            // Add assertions to validate the structure or content of the response
            expect(response.body.data._id).toBe(global.userId);
        });

        it('Fails to retrieve a user by invalid ID', async () => {
            const invalidId = 'invalid_id_here';

            const response = await request(server)
                .get(`/api/v1/user/details/InvalidID`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${invalidId}`);

            expect(response.status).toBe(401);
        });
    });

    describe('User update', () => {
        it('User updated by ID successfully', async () => {

            const response = await request(server)
                .patch(`/api/v1/user/update/${global.userId}`)
                .send(USER.validUserUpdate)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.userToken}`);

                console.log(response)

            expect(response.status).toBe(200);
        });

        it('Update a resource using a wrong ID', async () => {

            const response = await request(server)
                .patch(`/api/v1/user/update/invalidId`)
                .send(USER.invalidUserUpdate)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.userToken}`);

            expect(response.status).toBe(400);
        });
    });

}