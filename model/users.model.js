import mongoose from '../mongoose.service.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    permissionLevel: Number,
    formsAmount: Number
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('Users', userSchema);

export const findByUsername = async (username) => {
    return await User.find({ username: username });
};

export const findByEmail = async (email) => {
    return await User.find({ email: email });
};

export const usernameExist = async (username) => {
    return await User.exists({ username: username });
};

export const emailExist = async (email) => {
    return await User.exists({ email: email });
};
export const findById = async (id) => {
    let result = await User.findById(id);
    result = result.toJSON();
    delete result._id;
    delete result.id;
    delete result.__v;
    delete result.password;
    return result;
};

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

export const patchUser = async (id, userData) => {
    return await User.findOneAndUpdate({
        _id: id
    }, userData);
};

export const removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

