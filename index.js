const express = require('express'); //Esto sirve para el tipado
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicacion de express
const app = express();

// Base de Datos
dbConnection();

// Directorio Publico
app.use( express.static('public') );

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );

// Manejar demas rutas(Una vez terminada la aplicacion)
app.get( '*', (req, resp) => {
    resp.sendFile( path.resolve( __dirname, 'public/index.html' ) )
});



app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});