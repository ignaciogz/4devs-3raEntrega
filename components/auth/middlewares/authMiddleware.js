class Auth {
    isAuth(req, res, next) {
        if(req.isAuthenticated()){
            next();
        }else{
            res.json({ error: "No estas autenticado!" });
        }
    }
    
    isNotAuth(req, res, next) {
        if(!req.isAuthenticated()){
            next();
        }else{
            res.redirect('datos');
        }
    }
}

module.exports = new Auth();