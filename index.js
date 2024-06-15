require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

const messagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/incoming', async (req, res) => {
  try {
    console.log('Incoming message:', req.body);

    const message = req.body.Body;
    const twiml = new messagingResponse();

    const startTrigger = ['Hola', 'hola', 'Iniciar', 'iniciar', 'Empezar', 'empezar'];

    if (startTrigger.includes(message)) {
      twiml.message(
        '¡Bienvenid@ a Luna🌙🐶! Un chatbot🤖 simple que te ayuda a registrar facturas y llevar un control simple de tus gastos💰. Para empezar a funcionar, puedes cargar tus facturas y nosotros haremos el resto🪄.'
      );
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (error) {
    console.error('Error:', error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
