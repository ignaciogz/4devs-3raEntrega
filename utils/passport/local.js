const passportLocal = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { usersDao: storage } = require('../../models/daos');
const { AuthTools } = require("../tools");
const { errorLog: loggerWinston } = require("../loggers/winston");
const mailer = require('../notificators/mailer');

// ↓ ****** INICIO - PASSPORT-LOCAL ****** ↓
passportLocal.use('loginLocal', new LocalStrategy(async (username, password, done) => {
    try {
        const user = await storage.getByUserName(username);

        if (!user) {
            loggerWinston.error(`Error en login -> Passport: 'LOCAL' || Msj: Usuario con username '${username}' NO encontrado`)
            return done(null, false);
        }
    
        if (!AuthTools.isValidPassword(user, password)) {
            loggerWinston.error(`Contraseña invalida`)
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        loggerWinston.error(`Passport Local -> Ejecutando: 'Login LocalStrategy' || Error: ${error.message}`)
    }
}));


passportLocal.use('registerLocal', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
        const user = await storage.getByUserName(username);

        if (user) {
            loggerWinston.error(`Error en register -> Passport: 'LOCAL' || Msj: El usuario '${username}' ya existe !`)
            return done(null, false)
        }
        
        const newUser = {
            username,
            password: AuthTools.createHash(password),
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            edad: Number(req.body.edad),
            telefono: Number(req.body.telefono),
            foto: req.file.filename,
            administrator: false
        }

        mailer.sendNewUser(newUser);
    
        await storage.save(newUser);
        
        return done(null, newUser);   
    } catch (error) {
        loggerWinston.error(`Passport Local -> Ejecutando: 'Register LocalStrategy' || Error: ${error.message}`)
    }
}));

passportLocal.serializeUser((user, done) => {
    done(null, user.username);
});

passportLocal.deserializeUser(async (username, done) => {
    try {
        const user = await storage.getByUserName(username);
        done(null, user);   
    } catch (error) {
        loggerWinston.error(`Passport Local -> Ejecutando: 'deserializeUser' || Error: ${error.message}`)
    }
});
// ↑ ****** FIN - PASSPORT-LOCAL ****** ↑

module.exports = { passportLocal }