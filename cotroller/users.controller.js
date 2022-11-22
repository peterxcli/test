import * as UserModel from '../model/users.model.js';
import crypto from 'crypto';

export const checkUsernameUnique = async (req, res) => {
    let exist = await UserModel.usernameExist(req.params.username);
    if (exist) res.status(201).send("1");
    else res.status(201).send("0");
}

export const checkEmailUnique = async (req, res) => {
    let exist = await UserModel.emailExist(req.params.email);
    if (exist) res.status(201).send("1");
    else res.status(201).send("0");
}

export const insert = async (req, res) => {
    if (await UserModel.usernameExist(req.body.username)) res.status(409);
    if (await UserModel.emailExist(req.body.email)) res.status(409);
    let salt = crypto.randomBytes(16).toString('base64');
    console.log(req.body)
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    req.body.formsAmout = 0;
    let result = await UserModel.createUser(req.body);
    res.status(201).send({ id: result._id });
};

export const list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

export const getById = async (req, res) => {
    let result = await UserModel.findById(req.jwt.userId);
    res.status(200).send(result);
};

export const patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

export const removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result) => {
            res.status(204).send({});
        });
};