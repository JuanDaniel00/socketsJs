// Conectar con el servidor
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});

// Escuchar el evento 'ultimos-4'
socket.on('ultimos-4', (ultimos4) => {
  ultimos4.forEach((ticket, index) => {
    // Actualizar el número de ticket
    document.getElementById(`lblTicket${index + 1}`).textContent = `Ticket ${ticket.numero}`;
    // Actualizar el escritorio
    document.getElementById(`lblEscritorio${index + 1}`).textContent = `Escritorio ${ticket.escritorio}`;
  });
});