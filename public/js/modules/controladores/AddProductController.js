import { FormTools, Request, View } from '../igzlib.js';
import { Global } from '../utils.js';

class AddProductController {
    static async ejecutar() {
        const dataCart = await Request.GET(`/api/carrito/${Global.cartId}/productos`);
        const dataAuth = await Request.GET(`/api/auth`);

        let viewData = Object.assign(dataCart, dataAuth);

        if(dataAuth.isLogged) {
            const dataUser = await Request.GET(`/api/usuario`);
            viewData = Object.assign(viewData, dataUser);

            if(dataUser.user.administrator) {
                const HBSTemplate = await View.getHBS("addproduct");
                
                View.renderView(HBSTemplate, viewData);
                AddProductController.addEventHandlers();
            } else {
                location = "/#"
            }
        }
    }

    static addEventHandlers() {
        const formProduct = document.getElementById('formProduct');
        formProduct.addEventListener("submit", e => {
            e.preventDefault();

            const data = {
                nombre: FormTools.getInput("nombre"),
                precio: parseFloat(FormTools.getInput("precio")),
                foto: FormTools.getInput("foto"),
                stock: parseInt(FormTools.getInput("stock")),
                codigo: FormTools.getInput("codigo"),
                descripcion: FormTools.getInput("descripcion")
            }

            const res = Request.POST(`/api/productos/`, data);
            res.then(data => {
                window.location.hash = "#";
            });

            return false;
        });
    }
}

export { AddProductController as controlador };