import { Request, View } from '../igzlib.js';

class UserController {
    static async ejecutar() {
        const dataAuth = await Request.GET(`/api/auth`);

        if(dataAuth.isLogged) {
            const dataUser = await Request.GET(`/api/usuario`);
            const viewData = Object.assign(dataAuth, dataUser);

            const HBSTemplate = await View.getHBS("user");
            View.renderView(HBSTemplate, viewData);
        } else {
            location = "/#";
        }
    }
}

export { UserController as controlador };