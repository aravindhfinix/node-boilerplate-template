export const ADMIN = {
    validAdminSignup: {
        name: 'admin',
        email: 'admin@mailinator.com',
        password: 'Test@123',
        phone_number: '239392900',
    },
    invalidAdminSignup: {
        name: 'admin',
        email: 'invalid_admin@mailinator.com',
        password: 12344,
        phone_number: 'invalid_phone>_number',
    },
    validAdminLogin: {
        email: 'admin@mailinator.com',
        password: 'Test@123',
    },
    invalidAdminLogin: {
        email: 'invalid_admin@mailinator.com',
        password: 12344
    },
    validAdminUpdate: {
        name: 'testing admin'
    },
    invalidAdminUpdate: {
        name: 'admin1',
        email: 'admin1@mailinator.com',
        password: 'Test@123'
    }
}

export const USER = {
    validUserSignup: {
        name: "Doe",
        email: "johndoe@mailinator.com",
        kyc_document:['image1','image2'],
        password: "Test@123",
        phone_number: "+1234567890"
    },
    invalidUserSignup: {
        first_name: "John",
        last_name: "Doe",
        email: "invalid_admin@mailinator.com",
        password: 12344,
        phone_number: "+1234567890"
    },
    validVerificationPayload: {
        otp: 1234,
        type: 1,
    },
    invalidVerificationPayload: {
        email: 'invalid_admin@mailinator.com',
        password: 12344,
    },
    validLoginPayload: {
        email: 'johndoe@mailinator.com',
        password: 'Test@123',
    },
    invalidLoginPayload: {
        email: 'invalid_admin@mailinator.com',
        password: 12344,
    },
    validUserUpdate: {
        name: 'test',
    },
    invalidUserUpdate: {
        name: 'user',
        email: 'user1@mailinator.com',
        password: 'Test@123',
    }
};

