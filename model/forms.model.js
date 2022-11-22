import mongoose from '../mongoose.service.js';

const Schema = mongoose.Schema;

const FormSchema = new Schema(
    {
        creator: mongoose.SchemaTypes.ObjectId,
        username: String,
        email: String,
        data: String,
        title: String,
        desc: String,
        isPublic: Boolean,
        currentResponse: Number,
        requireLogin: Boolean,
        responseLimit: Number,
        DeadLine: Date,
    },
    {timestamps: true}
);

FormSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
FormSchema.set('toJSON', {
    virtuals: true
});

const Form = mongoose.model('Form', FormSchema);

export const findByUsername = async (username) => {
    return await Form.find({ username: username });
};

export const findByEmail = async (email) => {
    return await Form.find({ email: email });
};

export const findById = async (formId) => {
    let result = await Form.findById(formId);
    result = result.toJSON();
    delete result.__v;
    return result;
};

//#####################check exist##########################
export const idExist = async (id) => {
    return await Form.exists({ _id: id });
};

export const usernameExist = async (username) => {
    return await Form.exists({ username: username });
};

export const emailExist = async (email) => {
    return await Form.exists({ email: email });
};
//############################################################

export const createForm = async (formData) => {
    try{
        const form = new Form(formData);
        return await form.save();
    }
    catch(err) {
        return err;
    }
    
};

export const list = (userId, perPage, page) => {
    return new Promise((resolve, reject) => {
        Form.find({creator: userId})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, forms) {
                if (err) {
                    reject(err);
                } else {
                    resolve(forms);
                }
            })
    });
};

export const patchForm = async (id, formData) => {
    return await Form.findOneAndUpdate({_id: id}, formData);
};

export const removeById = async (formId) => {
    try{
        return await Form.deleteMany({ _id: formId });
    }
    catch(err) {
        return await err;
    }
};

