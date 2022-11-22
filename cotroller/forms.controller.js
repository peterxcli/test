import * as FormModel from '../model/forms.model.js'
import crypto from 'crypto';

export const checkFormExist = async (req, res) => {
    let exist = await FormModel.idExist(req.params.id);
    if (exist) res.status(201).send("1");
    else res.status(201).send("0");
}

export const insert = async (req, res) => {
    req.body.creator = req.jwt.userId;
    req.body.username = req.jwt.name;
    req.body.email = req.jwt.email;
    req.body.data = "[]";
    req.body.title = "Untitled";
    req.body.desc = "";
    console.log(req.body);
    let result = await FormModel.createForm(req.body);
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
    FormModel.list(req.jwt.userId, limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

export const getById = async (req, res) => {
    let result = await FormModel.findById(req.params.formId);
    res.status(200).send(result);
};

export const patchById = (req, res) => {
    FormModel.patchForm(req.params.formId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

export const removeById = (req, res) => {
    FormModel.removeById(req.params.formId)
        .then((result) => {
            res.status(204).send({});
        });
};