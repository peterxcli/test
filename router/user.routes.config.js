import * as UsersController from '../cotroller/users.controller.js';
import * as PermissionMiddleware from '../middlewares/auth.permission.middleware.js';
import * as ValidationMiddleware from '../middlewares/auth.validation.middleware.js';
import config from '../env.config.js';

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

export const routesConfig = (app) => {
    app.get('/', function (req, res) {
        res.send('hello world');
    });

    app.get('/usernameCheck/:username', [
        UsersController.checkUsernameUnique,
    ]);
    app.get('/emailCheck/:email', [
        UsersController.checkEmailUnique,
    ]);
    app.get('/user', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.getById
    ]);
    app.post('/users', [
        // UsersController.checkUnique,
        UsersController.insert
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    // app.get('/users/:userId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     UsersController.getById
    // ]);
    // app.patch('/users/:userId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     UsersController.patchById
    // ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
};
