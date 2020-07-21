const mongoose = require('mongoose');
const UserModel = require('../models/User');
const userData = { name: 'superUser', email: 'Male', password: 'hehe', avatar: 'hehe', date: new Date() };

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.gender).toBe(userData.gender);
        expect(savedUser.dob).toBe(userData.dob);
        expect(savedUser.loginUsing).toBe(userData.loginUsing);
    });


})