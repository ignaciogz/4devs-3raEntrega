const usersServices = require('../services/usersServices');

class Users {
    getUserData(req, res, next) {
        const user = usersServices.getUserData(req.user);

        res.json({ user });
    }
}

module.exports = new Users();