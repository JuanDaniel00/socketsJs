
import { Ticket } from '../models/tickets.js';
import TicketControl from '../models/ticket-control.js';
const ticketControl = new TicketControl();


// Definición de la función socketController
const socketController = (socket, io) => {


    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        io.emit('ticket-actual', ticketControl.ultimo);
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // TODO: Notificar cambio en los últimos 4
        socket.on('estado-actual', (ultimos4) => {
            // Actualizar la interfaz con los últimos 4
            const [ul, ol, div] = ultimos4.length
                ? ['ticket1', 'ticket2', 'ticket3', 'ticket4'].map(elem => document.querySelector('.' + elem))
                : [null, null, null, null];

            if (!ul) {
                return;
            }

            ul.innerText = 'Ticket ' + ultimos4[0].numero;
            ol.innerText = 'Ticket ' + ultimos4[1].numero;
            div.innerText = 'Ticket ' + ultimos4[2].numero;
        });

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
    socket.on('ticket-actual', (ticket) => {
        ticket.innerText = 'Ticket ' + ticket.numero;
    });
    socket.on('tickets-pendientes', (length) => {
        lblPendientes.innerText = length;
    });
    socket.on('connect', () => {
        console.log('Conectado');
    });



}

export { socketController };