import { Request, View } from '../igzlib.js';

class RegisterController {
    static async ejecutar() {
        const dataAuth = await Request.GET(`/api/auth`);

        if(!dataAuth.isLogged) {
            const HBSTemplate = await View.getHBS("signup");
            View.renderView(HBSTemplate);
        } else {
            location = "/#";
        }
    }
}

export { RegisterController as controlador };