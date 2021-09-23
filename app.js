const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require('cors');

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuracion a base de datos
const mongoose = require('mongoose');

// Conexion a BD
mongoose.connect(process.env.PORT, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
mongoose.set("debug", true);

//importar los Schemas
require('./models/Usuario');
require('./models/Mascota');
require('./models/Solicitud');

// Se importa el archivo de configuracion passport.js
require('./config/passport');

//Configurando las rutas
app.use('/v1', require('./routes'));

// Inicia el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});