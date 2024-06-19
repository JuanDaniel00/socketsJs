let contador = 0

const btn = document.getElementById('btnNuevoTicket')
const lblNuevoTicket = document.getElementById('lblNuevoTicket')


const socket = io()

// 1:
const nuevoTicket = document.querySelector('button');
nuevoTicket.addEventListener('click', () => {
    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = `Ticket` + ticket;
    });
}
);

// 2:

socket.on('ticket-actual', (ticket) => {
    lblNuevoTicket.innerText = `Ticket ` + ticket;
}
);

// 3:

socket.on('tickets-pendientes', (length) => {
    lblPendientes.innerText = length;
}
);

// 4:

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
}
);


