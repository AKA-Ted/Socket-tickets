const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            /* Hace que el último ticket 
            sea persistente */
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            /* Reinicia el conteo de tickets
            cuando es un día nuevo */
            this.reiniciarConteo()
        }
    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarTickets();

        return `Ticket ${ this.ultimo }`;
    }

    getLastTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getLast4() {
        return this.ultimos4 ;
    }

    atenderTicket(escritorio){
        
        if(this.tickets.length === 0){
            return 'No hay tickets';
        }

        let numTicket = this.tickets[0].numero;
        //Elimina la última posicion del arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numTicket, escritorio);

        //Pone el ticket al principio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if(this.ultimos4.length > 4){
            //Borra el ultimo 
            this.ultimos4.splice(-1,1)
            console.log(this.ultimos4);
        }

        this.guardarTickets();
        
        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = []

        console.log('Se ha inicializado el sistema');
        this.guardarTickets();
    }

    guardarTickets() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}