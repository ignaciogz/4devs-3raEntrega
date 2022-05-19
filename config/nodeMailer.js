const { config } = require('./index');
const { createTransport } = require('nodemailer');
const { errorLog: loggerWinston } = require("../utils/loggers/winston");

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.ADMIN_EMAIL,
        pass: config.ADMIN_PASS_APP
    }
});

const enviarEmail = (mailOptions, ejecutando = "") => {
    try {
        transporter.sendMail(mailOptions);
    } catch (error) {
        loggerWinston.error(`NodeMailer -> Ejecutando: '${ejecutando}' || Error: ${error.message}`);
    }
}

const mailAdmin_nuevoUsuario = (newUser) => {
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
    
    enviarEmail(mailOptions, "mailAdmin_nuevoUsuario()");
}

const mailAdmin_nuevoPedido = (user, detail) => {
    let detailText = "";

    for (const nombreDeProducto in detail) {
        detailText += `<li><b>${detail[nombreDeProducto]}u</b> de <i>'${nombreDeProducto}'</i></li>`;
    }

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
    
    enviarEmail(mailOptions, "mailAdmin_nuevoPedido()");
}

module.exports = { mailAdmin_nuevoPedido, mailAdmin_nuevoUsuario };