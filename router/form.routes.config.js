import * as FormsController from '../cotroller/users.controller.js';
import * as PermissionMiddleware from '../middlewares/auth.permission.middleware.js';
import * as ValidationMiddleware from '../middlewares/auth.validation.middleware.js';
import config from '../env.config.js';

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

export const routesConfig = (app) => {

    app.get('/form:formId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        FormsController.getById
    ]);
    app.post('/forms/new', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        FormsController.insert
    ]);
    app.get('/form/list', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        FormsController.list
    ]);
    app.delete('/form/:formId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        FormsController.removeById
    ]);
};
