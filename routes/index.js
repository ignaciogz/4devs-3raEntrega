const authAPI = require('../components/auth');
const cartAPI = require('../components/cart');
const productsAPI = require('../components/products');
const usersAPI = require('../components/users');

module.exports = app => {
    // Aqui invoco componentes
    authAPI(app);
    cartAPI(app);
    productsAPI(app);
    usersAPI(app);
    
    // Aqui defino la ruta base
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: __dirname });
    });
}