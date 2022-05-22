const { config } = require('../../../config');
const twilio = require('twilio');
const { errorLog: loggerWinston } = require("../../loggers/winston");

class Twilio {
   static send(options, ejecutando = "") {
      try {
         const client = twilio(config.TWILIO_SID, config.TWILIO_TOKEN, {
            lazyLoading: true
         });
   
         client.messages.create(options);
      } catch (error) {
         loggerWinston.error(`Twilio -> Ejecutando: '${ejecutando}' || Error: ${error.message}`);
      }
   }

   sendSMS_NewOrder(user) {
      const options = {
         body: `Hola ${user.nombre}! su pedido ha sido recibido y se encuentra en proceso :D`,
         from: config.TWILIO_PHONE,
         to: `+${user.telefono}`
      }
   
      Twilio.send(options, "smsUser_nuevoPedido()");
   }
   
   sendWPP_NewOrder(user) {
      const options = {
         body: `Nuevo pedido de ${user.nombre} - ${user.username}`,
         from: `whatsapp:${config.TWILIO_WPP_PHONE}`,
         to: `whatsapp:${config.ADMIN_PHONE}`
      }
   
      Twilio.send(options, "wppAdmin_nuevoPedido()");
   }
}

module.exports = new Twilio();