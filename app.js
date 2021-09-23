// Express
const express = require('express');
const app = express();

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// Configuración de bases de datos
const mongoose = require('mongoose');
var isProduction = process.env.NODE_ENV === 'production';

mongoose.connect(
  process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

 mongoose.set("debug",true)

require('./models/Usuario');
require('./models/Mascota');

require('./config/passport');

// configuración de la ruta
app.use('/v1', require('./routes'));

// Iniciando el servidor
const PORT = 4001;
// Iniciando el servidor...
var server = app.listen(process.env.PORT, function () {
  console.log('Escuchando en el puerto ' + server.address().port);
});


