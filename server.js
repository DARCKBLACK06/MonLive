const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const monitorSocket = require('./sockets/monitor.socket');

const PORT = 8000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(express.static('public'));

server.on('error', (err) => {
 if (err.code === 'EADDRINUSE') {
   console.error('El puerto 8000 ya esta en uso');
   process.exit(1);
 }
});

// Inicializar sockets
monitorSocket(io);

server.listen(PORT, () => {
  console.log(`MonLive activo en http://localhost:${PORT}`);
});
