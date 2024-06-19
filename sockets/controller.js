import TicketControl from '../models/ticket-control.js';
const ticketControl = new TicketControl();

const socketController = (socket, io) => {
    // Cuando un cliente se conecta, inmediatamente le enviamos el estado actual de los últimos 4
    socket.emit('estado-actual', ticketControl.ultimos4);

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
            // Emitir los cambios de los últimos 4 a todos los clientes
            io.emit('ultimos-4', ticketControl.ultimos4);
        }
    });
};

export { socketController };