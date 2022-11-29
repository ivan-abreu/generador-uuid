const express = require('express');
const http = require('http');
const helmet = require('helmet');
var compression = require('compression');
require('dotenv').config();
const {v4: uuidv4} = require('uuid');
const exp = require('constants');

const app = express();      // crear la app de express
// app.use( helmet() );     // agrega cabecera http correctas, solo para producion, 
                            // en desarrollo agrega seguridad innecesaria
app.use( compression() );   // comprime las respuestas, mas velocidad y menos trafico saliente

const serverHttp = http.createServer(app);                  // crea un servidor con nuestra app
serverHttp.listen( process.env.HTTP_PORT, process.env.IP);  // escucha en (PORT, IP)
// console.log( process.env.HTTP_PORT );                       // test

app.use(express.static('./public'));

// repuestas de la carpeta raiz
// app.get('/', function(req, res) {
//     res.send('hola mundo');
// })


// http://127.0.0.1/api/get-uuid
app.get('/api/get-uuid', function(req, res) {
    res.send( uuidv4() );
})


app.get('*', function(req, res) {
    res.status(404).send('Error 404 - Recurso no encontrado');
})