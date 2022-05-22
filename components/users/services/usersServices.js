const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Users {
    getUserData(userLogged) {
        return { 
            email: userLogged.username,
            nombre: userLogged.nombre,
            direccion: userLogged.direccion,
            edad: userLogged.edad,
            telefono: userLogged.telefono,
            foto: userLogged.foto,
            administrator: userLogged.administrator
        }
    }
}

module.exports = new Users();