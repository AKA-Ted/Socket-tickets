const express = require('express');
const socketIO = require('socket.io');
/* 
    Socket no trabaja directamente con express
    se usa http para levantar un servidor
*/
const http = require('http');

const path = require('path');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicación del backend
module.exports.io = socketIO(server);
require('./sockets/socket')

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});