const MongoDBContainer = require('../../containers/MongoDBContainer');
const usersSchema = require('../../schemas/nosql/users');

class AuthDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("users", usersSchema);
    }

    async getByUserName(username) {
        try {
            const result = await this.model.find({username}).limit(1);
            return result.shift();
        } catch (error) {
            console.log("Error getByUserName() ", error);
        }
    }

    async desconectar() {

    }
}

module.exports = AuthDaoMongoDB;