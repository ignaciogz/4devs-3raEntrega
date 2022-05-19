import { Request, View } from '../igzlib.js';

class LoginController {
    static async ejecutar() {
        const dataAuth = await Request.GET(`/api/auth`);

        if(!dataAuth.isLogged) {
            const HBSTemplate = await View.getHBS("login");
            View.renderView(HBSTemplate);
        } else {
            location = "/#";
        }
    }
}

export { LoginController as controlador };