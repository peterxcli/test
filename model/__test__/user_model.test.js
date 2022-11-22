import mongoose from 'mongoose';
import config from '../../env.config.js';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
};

beforeAll(async () => {
    await mongoose.connect(config.mongo_test_url, options);
});

describe("user model test", () => {
    it("connection establish", () => {
        expect(mongoose.connection.readyState).toEqual(1);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
