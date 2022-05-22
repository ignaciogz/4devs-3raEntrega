class Products {
    access(req, res ,next) {
        const method = req.method;
    
        if(req.user && !req.user.administrator && method != "GET") {
            res.json({
                error: '-1',
                descripcion: `ruta: '${req.path}' metodo: '${method}' NO autorizada`
            });
        }
    
        next();
    }
}

module.exports = new Products();