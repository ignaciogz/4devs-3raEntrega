const usersServices = require('../services/usersServices');

class Users {
    getUserData(req, res, next) {
        const data = req.user;
        
        res.json({
            user: { 
                email: data.username,
                nombre: data.nombre,
                direccion: data.direccion,
                edad: data.edad,
                telefono: data.telefono,
                foto: data.foto,
                administrator: data.administrator
            }
        });
    }
}

module.exports = new Users();