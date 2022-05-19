class Ruteador {
    static rutas = {
        "/": "IndexController",
        "addproduct": "AddProductController",
        "cart": "CartController",
        "login": "LoginController",
        "register": "RegisterController",
        "user": "UserController"
    };

    static existe(pagina) {
        const existeRuta = Ruteador.rutas.hasOwnProperty(pagina);

        return existeRuta;
    }

    static getControlador(pagina) {
        return Ruteador.rutas[pagina];
    }
}

export { Ruteador };
