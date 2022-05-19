const express = require('express');
const authController = require('./controllers/authController');
const authMw = require('../../utils/middlewares/AuthMw');
const { passportLocal } = require('../../utils/passport/local');
const { uploadFile } = require('../../utils/multer');

module.exports = app => {
    const router = express.Router();
    app.use('/api/auth', router);

    // Aqui cargo los middlewares de rutas
    router.get("/", authController.isLogged);
    
    router.get("/error", authMw.isNotAuth, authController.error);
    
    router.post("/login", passportLocal.authenticate("loginLocal", {successRedirect: "/", failureRedirect: "/api/auth/error"}));
    
    router.post("/registro", uploadFile.single("foto"), passportLocal.authenticate("registerLocal", {successRedirect: "/", failureRedirect: "/api/auth/registro"}));

    router.get("/logout", authMw.isAuth, authController.logout);
}