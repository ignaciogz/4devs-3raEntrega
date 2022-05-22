const cartService = require('../services/cartService');

const mailer = require('../../../utils/notificators/mailer');
const twilio = require('../../../utils/notificators/twilio');

class Cart {
    async getID(req, res, next) {
        const { id } = req.params;
    
        const cart = await cartService.getID(id);
        res.json({ cart });
    };

    async checkout(req, res, next) {
        const { id } = req.params;
        
        const cart = await cartService.getID(id);
        const detail = cartService.getDetail(cart);
        
        mailer.send_NewOrder(req.user, detail);
        twilio.sendWPP_NewOrder(req.user);
        twilio.sendSMS_NewOrder(req.user);

        await cartService.delete(id);

        res.json({});
    }
    
    async create(req, res, next) {
        const id = await cartService.create();
        res.json({ id });
    };

    async add(req, res, next) {
        const { id } = req.params;
        const { id_prod } = req.body;
        
        await cartService.add(id, id_prod);
        res.json({});
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await cartService.delete(id);
        res.json({});
    };

    async deleteProduct(req, res, next) {
        const { id, id_prod } = req.params;
        
        await cartService.deleteProduct(id, id_prod);
        res.json({});
    };
}

module.exports = new Cart();