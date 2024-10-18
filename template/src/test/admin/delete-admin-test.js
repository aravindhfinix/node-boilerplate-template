import request from 'supertest';


export const runDeleteTests = (server) => {

    describe('Admin user delete', () => {
        it('Deletes a user using a wrong ID', async () => {
            const response = await request(server)
                .delete('/api/v1/admin/delete-user/invalidID')
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`);

            expect(response.status).toBe(400);
        });

        it('User deleted by ID successfully', async () => {
            const response = await request(server)
                .delete(`/api/v1/admin/delete-user/${global.userId}`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`);

            expect(response.status).toBe(200);
        });
    });


    describe('Admin delete', () => {

        it('Deletes a resource using a wrong ID', async () => {
            const response = await request(server)
                .delete('/api/v1/admin/delete/invalidID')
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)

            expect(response.status).toBe(400);
        });

        it('Admin deleted by ID successfully', async () => {
            const response = await request(server)
                .delete(`/api/v1/admin/delete/${global.adminId}`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)

            expect(response.status).toBe(200);
        });

    });

};