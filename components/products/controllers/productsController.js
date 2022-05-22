const productsService = require('../services/productsService');

class Products {
    async getAll(req, res, next) {
        const products = await productsService.getAll();
        res.json({ products });
    };

    async getID(req, res, next) {
        const { id } = req.params;
    
        const product = await productsService.getID(id);
        res.json({ product });
    };
    
    async add(req, res, next) {
        const newProduct = req.body;
    
        const id = await productsService.add(newProduct);
        res.json({ id });
    };
    
    async update(req, res, next) {
        const { id } = req.params;
        const modifiedProduct = req.body;
        
        await productsService.update(parseInt(id), modifiedProduct);
        res.json({});
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await productsService.delete(id);
        res.json({});
    };

    // Extras
    async productExist(req, res ,next) {
        const { id } = req.params;
    
        const productExist = await productsService.productIDExist(id)
        productExist ? next() : res.json({ error : 'producto no encontrado' });
    }
}

module.exports = new Products();