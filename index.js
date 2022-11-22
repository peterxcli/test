import config from './env.config.js';

import express from 'express';
const app = express();

import * as AuthorizationRouter from './router/authorization.routes.config.js';
import * as UsersRouter from './router/user.routes.config.js';
import * as FormRouter from './router/form.routes.config.js';

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
FormRouter.routesConfig(app);


app.listen(config.port, '0.0.0.0', function () {
    console.log('app listening at port %s', config.port);
});
