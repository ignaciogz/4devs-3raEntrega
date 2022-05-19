const { productsDao } = require('../../../utils/daos');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Products {
    constructor() {
        this.storage = productsDao;
    }

    async getAll() {
        try {
            const products = await this.storage.getAll();
            return products;    
        } catch (error) {
            loggerWinston.error(`ProductsServices -> Ejecutando: 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const product = await this.storage.getByID(id);
            return product;    
        } catch (error) {
            loggerWinston.error(`ProductsServices -> Ejecutando: 'getID()' || Error: ${error.message}`)
        }
    }

    async add(newProduct) {
        try {
            const productID = await this.storage.save(newProduct);
            return productID;   
        } catch (error) {
            loggerWinston.error(`ProductsServices -> Ejecutando: 'add()' || Error: ${error.message}`)
        }
    }

    async update(id, modifiedProduct) {
        try {
            await this.storage.update(id, modifiedProduct);    
        } catch (error) {
            loggerWinston.error(`ProductsServices -> Ejecutando: 'update()' || Error: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);    
        } catch (error) {
            loggerWinston.error(`ProductsServices -> Ejecutando: 'delete()' || Error: ${error.message}`)
        }
    }

    async productIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            loggerWinston.error(`ProductsServices -> Ejecutando: 'productIDExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Products();