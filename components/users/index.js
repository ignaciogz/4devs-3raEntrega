const express = require('express');
const usersController = require('./controllers/usersController');
const authMw = require('../../utils/middlewares/AuthMw');

module.exports = app => {
    const router = express.Router();
    app.use('/api/usuario', router);

    // Aqui cargo los middlewares de rutas
    router.get("/", authMw.isAuth, usersController.getUserData);
}