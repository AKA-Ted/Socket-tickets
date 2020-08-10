// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectando al servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexion');
});

socket.on('estadoActual', function (estado) {
    label.text(estado.actual);
});

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});