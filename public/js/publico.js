// import { Ticket } from '../models/tickets.js';
// import TicketControl from '../models/ticket-control.js';
// const ticketControl = new TicketControl();

// // Definición de la función socketController
// const socketController = (socket, io) => {

//     socket.on('disconnect', () => {
//         console.log('Desconectado del servidor');
//     });

//     socket.on('siguiente-ticket', (payload, callback) => {
//         const siguiente = ticketControl.siguiente();
//         callback(siguiente);
//         io.emit('ticket-actual', ticketControl.ultimo);
//     });

//     socket.on('atender-ticket', ({ escritorio }, callback) => {
//         if (!escritorio) {
//             return callback({
//                 ok: false,
//                 msg: 'El escritorio es obligatorio'
//             });
//         }

//         const ticket = ticketControl.atenderTicket(escritorio);

//         // TODO: Notificar cambio en los últimos 4
//         socket.on('estado-actual', (ultimos4) => {
//             // Actualizar la interfaz con los últimos 4
//             const [ul, ol, div] = ultimos4.length
//                 ? ['ticket1', 'ticket2', 'ticket3', 'ticket4'].map(elem => document.getElementById('.' + elem))
//                 : [null, null, null, null];

//             if (!ul) {
//                 return;
//             }

//             ul.innerText = 'Ticket ' + ultimos4[0].numero;
//             ol.innerText = 'Ticket ' + ultimos4[1].numero;
//             div.innerText = 'Ticket ' + ultimos4[2].numero;
//         });

//         if (!ticket) {
//             callback({
//                 ok: false,
//                 msg: 'Ya no hay tickets pendientes'
//             });
//         } else {
//             callback({
//                 ok: true,
//                 ticket
//             });
//         }
//     });
//     socket.on('ticket-actual', (ticket) => {
//         ticket.innerText = 'Ticket ' + ticket.numero;
//     });
//     socket.on('tickets-pendientes', (length) => {
//         lblPendientes.innerText = length;
//     });
//     socket.on('connect', () => {
//         console.log('Conectado');
//     });

// }

// export { socketController };

// necesito que siguiendo los parametros de los controllers mencionado anteriormente se pueda hacer la actualización de los tickets en la pantalla publica:
// 1. Cuando se oiga el evento 'ticket-actual' se actualice el ticket en pantalla
// 2. Cuando se oiga el evento 'tickets-pendientes' se actualice el número de tickets pendientes en pantalla
// 3. Cuando se oiga el evento 'estado-actual' se actualicen los últimos 4 tickets en pantalla
// 4. Cuando se oiga el evento 'connect' se muestre un mensaje en consola

// Nota: Para actualizar los tickets en pantalla se debe hacer uso de los elementos del DOM con los siguientes selectores:
// - Para el ticket actual: #lblTicket
// - Para los tickets pendientes: #lblPendientes
// - Para los últimos 4 tickets: .ticket1, .ticket2, .ticket3, .ticket4
// - Para el escritorio: #lblEscritorio
// - Para el botón de siguiente ticket: #btnSiguiente
// - Para el botón de atender ticket: #btnAtender

// ten en cuenta el nuevo-ticket.js:

// let contador=0

// const btn = document.getElementById('btnNuevoTicket')
// const lblNuevoTicket = document.getElementById('lblNuevoTicket')


// const socket = io()

// // 1:
// const nuevoTicket = document.querySelector('button');
// nuevoTicket.addEventListener('click', () => {
//     socket.emit('siguiente-ticket', null, (ticket) => {
//         lblNuevoTicket.innerText = `Ticket` + ticket;
//     });
// }
// );

// // 2:

// socket.on('ticket-actual', (ticket) => {
//     lblNuevoTicket.innerText =  `Ticket ` + ticket;
// }
// );

// // 3:

// socket.on('tickets-pendientes', (length) => {
//     lblPendientes.innerText = length;
// }
// );

// // 4:

// socket.on('estado-actual', (ultimos4) => {
//     // Actualizar la interfaz con los últimos 4
//     const [ul, ol, div] = ultimos4.length
//         ? ['ticket1', 'ticket2', 'ticket3', 'ticket4'].map(elem => document.querySelector('.' + elem))
//         : [null, null, null, null];

//     if (!ul) {
//         return;
//     }

//     ul.innerText = 'Ticket ' + ultimos4[0].numero;
//     ol.innerText = 'Ticket ' + ultimos4[1].numero;
//     div.innerText = 'Ticket ' + ultimos4[2].numero;
// }
// );

// haz lo que debas hacer para que funcine el publico.js:

// 1. Importa el socket en el archivo publico.js

// publico.js

// ... (rest of your code to select DOM elements) ...
import io from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});

socket.on('estado-actual', (payload) => {
  const audio = new Audio('./audio/new-ticket.mp3');
  audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (ticket1) {
    ticket1.innerText = 'Ticket ' + ticket1.numero;
    lblEscritorio1.innerText = ticket1.escritorio;
  }
  if (ticket2) {
    ticket2.innerText = 'Ticket ' + ticket2.numero;
    lblEscritorio2.innerText = ticket2.escritorio;
  }
  if (ticket3) {
    ticket3.innerText = 'Ticket ' + ticket3.numero;
    lblEscritorio3.innerText = ticket3.escritorio;
  }
  if (ticket4) {
    ticket4.innerText = 'Ticket ' + ticket4.numero;
    lblEscritorio4.innerText = ticket4.escritorio;
  }
});
