const authServices = require('../services/authServices');

class Auth {
    getLogin(req, res, next) {
        res.json({ Pagina: "Login" });
    }

    getRegistro(req, res, next) {
        res.json({ Pagina: "Registro" });
    }

    isLogged(req, res, next) {
        if(req.isAuthenticated()) {
            res.json({ isLogged: true });
        } else {
            res.json({ isLogged: false });
        }
    }

    error(req, res, next) {
        res.json({ Error: "Un Mensaje de error" });
    }

    logout(req, res, next) {
        req.session.destroy( err => {
            if(err) res.send(JSON.stringify(err));
            res.redirect("/");
        });
    }
}

module.exports = new Auth();