import request from 'supertest';

export const runUserManagementTests = (server) => {

    describe('User list', () => {
        it('Retrieves a list of users', async () => {
            const response = await request(server)
                .get('/api/v1/admin/list-users')
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('User details', () => {
        it('Retrieves a user by valid Id', async () => {
            const response = await request(server)
                .get(`/api/v1/admin/user-details/${global.userId}`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`);

            expect(response.status).toBe(200);
            // Add assertions to validate the structure or content of the response
            expect(response.body.data._id).toBe(global.userId);
        });

        it('Fails to retrieve a user by invalid ID', async () => {
            const invalidId = 'invalid_id_here';

            const response = await request(server)
                .get(`/api/v1/admin/user-details/${invalidId}`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`);

            expect(response.status).toBe(400);
        });
    });
}