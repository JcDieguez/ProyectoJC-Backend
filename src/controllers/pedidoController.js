const Pedido = require('../models/pedido');
const sendMail = require('../utils/sendMail');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const adminPhoneNumber = '+1234567890'; // número de teléfono del administrador

const pedidoController = async (req, res) => {
  const { productos, nombre, email } = req.body;

  try {
    const pedido = await Pedido.create({
      productos,
      nombre,
      email,
    });

    const asunto = `Nuevo pedido de ${nombre} (${email})`;
    const cuerpo = `Lista de productos:\n${productos.join('\n')}`;
    const mensaje = `${asunto}\n${cuerpo}`;

    await sendMail({ to: adminEmail, subject: asunto, body: cuerpo });

    await client.messages.create({
      body: mensaje,
      from: 'whatsapp:+14155238886', // número de teléfono de Twilio para enviar mensajes de WhatsApp
      to: `whatsapp:${adminPhoneNumber}`,
    });

    res.send('Pedido recibido');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al procesar el pedido');
  }
};

module.exports = pedidoController;
