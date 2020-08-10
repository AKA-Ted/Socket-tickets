const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

//client contiene toda la info de la computadora
io.on('connection', (client) => {
    // Escuchar al cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente)

    });

    client.emit('estadoActual', {
        actual : ticketControl.getLastTicket(),
        ultimos4: ticketControl.getLast4()
    });

   

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true, 
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar/notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getLast4()
        });
    });
});
