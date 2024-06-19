document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnNuevoTicket');
    const lblNuevoTicket = document.getElementById('lblNuevoTicket');
    const lblPendientes = document.getElementById('lblPendientes');

    const socket = io();

    socket.on('connect', () => {

        socket.on('tickets-pendientes', (length) => {
            lblPendientes.innerText = length;
        });
    });

    btn.addEventListener('click', () => {
        socket.emit('siguiente-ticket', null, (ticket) => {
            lblNuevoTicket.innerText = ticket;
        });
    });
});

