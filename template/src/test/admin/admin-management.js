import request from 'supertest';
import { ADMIN } from '../constant';


export const runAdminTests = (server) => {

    describe('Admin Signup API', () => {

        it('Signs up an admin successfully', async () => {
            const response = await request(server)
                .post('/api/v1/admin/signup')
                .send(ADMIN.validAdminSignup)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(200);
        });

        it('Handles incorrect signup credentials gracefully', async () => {
            const response = await request(server)
                .post('/api/v1/admin/signup')
                .send(ADMIN.invalidAdminSignup)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(400);
        });

    });


    describe('Admin login', () => {

        it('Login admin successfully', async () => {

            const response = await request(server)
                .post('/api/v1/admin/login')
                .send(ADMIN.validAdminLogin)
                .set('Origin', 'http://localhost:4200');

            expect(response.status).toBe(200);
            global.adminId = response.body.data.admin._id
            global.adminToken = response.body.data.session.session_token
        });

        it('Handles incorrect login credentials gracefully', async () => {

            const response = await request(server)
                .post('/api/v1/admin/login')
                .send(ADMIN.invalidAdminLogin)
                .set('Origin', 'http://localhost:4200');

            console.log(response)

            expect(response.status).toBe(400);
        });

    });


    describe('Admin list', () => {

        it('Retrieves a list of admins', async () => {
            const response = await request(server)
                .get('/api/v1/admin/list')
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)

            expect(response.status).toBe(200);
            // Add assertions to validate the structure or content of the response
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });


    describe('Admin get by ID', () => {

        it('Retrieves an admin by valid ID', async () => {
            const response = await request(server)
                .get(`/api/v1/admin/details/${global.adminId}`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)


            expect(response.status).toBe(200);
            // Add assertions to validate the structure or content of the response
            expect(response.body.data._id).toBe(global.adminId);
        });

        it('Fails to retrieve an admin by invalid ID', async () => {

            const response = await request(server)
                .get(`/api/v1/admin/details/28828299`)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)

            expect(response.status).toBe(400); 
        });

    });


    describe('Admin update', () => {

        it('Admin updated by ID successfully', async () => {

            const response = await request(server)
                .patch(`/api/v1/admin/update/${global.adminId}`)
                .send(ADMIN.validAdminUpdate)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)

            expect(response.status).toBe(200);
        });

        it('Update a resource using a wrong ID', async () => {

            const response = await request(server)
                .patch(`/api/v1/admin/update/929929292`)
                .send(ADMIN.invalidAdminUpdate)
                .set('Origin', 'http://localhost:4200')
                .set('Authorization', `bearer ${global.adminToken}`)

            expect(response.status).toBe(400);
        });

    });


    // describe('Admin delete', () => {

    //     it('Deletes a resource using a wrong ID', async () => {
    //         const response = await request(server)
    //             .delete('/api/v1/admin/delete/invalidID')
    //             .set('Origin', 'http://localhost:4200')
    //             .set('Authorization', `bearer ${global.adminToken}`)

    //         expect(response.status).toBe(400);
    //     });

    //     it('Admin deleted by ID successfully', async () => {
    //         const response = await request(server)
    //             .delete(`/api/v1/admin/delete/${global.adminId}`)
    //             .set('Origin', 'http://localhost:4200')
    //             .set('Authorization', `bearer ${global.adminToken}`)

    //         expect(response.status).toBe(200);
    //     });

    // });

};