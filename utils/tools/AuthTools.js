const bCrypt = require("bcrypt");

class AuthTools {
    static isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    
    static createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}

module.exports = AuthTools;