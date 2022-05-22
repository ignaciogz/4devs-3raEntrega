const { config } = require('../../../config/index');
const { createTransport } = require('nodemailer');
const { errorLog: loggerWinston } = require("../../loggers/winston");

class NodeMailer {
    static transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.ADMIN_EMAIL,
            pass: config.ADMIN_PASS_APP
        }
    });
    
    static send(mailOptions, ejecutando = "") {
        try {
            NodeMailer.transporter.sendMail(mailOptions);
        } catch (error) {
            loggerWinston.error(`NodeMailer -> Ejecutando: '${ejecutando}' || Error: ${error.message}`);
        }
    }

    send_NewUser(newUser) {
        const mailOptions = {
            from: 'Servidor Node.js',
            to: config.ADMIN_EMAIL,
            subject: 'Nuevo registro',
            html: `
                <h1 style="color: blue;">Nuevo usuario registrado</h1>
                <ul>
                    <li>Email: ${newUser.username}</li>
                    <li>Password: ${newUser.password}</li>
                    <li>Nombre: ${newUser.nombre}</li>
                    <li>Direccion: ${newUser.direccion}</li>
                    <li>Edad: ${newUser.edad}</li>
                    <li>Telefono: ${newUser.telefono}</li>
                    <li>Foto: ${newUser.foto}</li>
                </ul>
            `
        }
        
        NodeMailer.send(mailOptions, "mailAdmin_nuevoUsuario()");
    }
    
    send_NewOrder(user, detail) {
        const detailText = NodeMailer.createDetailText(detail);
    
        const mailOptions = {
            from: 'Servidor Node.js',
            to: config.ADMIN_EMAIL,
            subject: `Nuevo pedido de ${user.nombre} - ${user.username}`,
            html: `
                <h1 style="color: orange;">Nuevo pedido !</h1>
    
                <h3>DETALLE: </h3>
                <ul>
                    ${detailText}
                </ul>
            `
        }
        
        NodeMailer.send(mailOptions, "mailAdmin_nuevoPedido()");
    }

    static createDetailText(detail) {
        let detailText = "";
    
        for (const nombreDeProducto in detail) {
            detailText += `<li><b>${detail[nombreDeProducto]}u</b> de <i>'${nombreDeProducto}'</i></li>`;
        }

        return detailText;
    }
}

module.exports = new NodeMailer();