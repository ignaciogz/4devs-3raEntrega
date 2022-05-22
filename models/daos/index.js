const { config } = require('../../config');

// Los posibles SELECTED_STORAGE son -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const CartsDao = require(`./carts/CartsDao${config.SELECTED_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_STORAGE}`);
const UsersDao = require(`./users/UsersDaoMongoDB`);

const myDAO = {
    cartsDao: new CartsDao(),
    productsDao: new ProductsDao(),
    usersDao:  new UsersDao()
}

class DAO {
    static singleton;

    constructor() {
        if(DAO.singleton){
            return DAO.singleton;
        }
        
        DAO.singleton = myDAO;
        this.singleton = DAO.singleton;
    }
}

module.exports = new DAO().singleton;