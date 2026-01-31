const { getSystemStats } = require('../services/system.service');
const config = require('../config/monitor.config');

function monitorSocket(io) {
  const monitorNamespace = io.of('/monlive');

  monitorNamespace.on('connection', async (socket) => {
    console.log(`Cliente conectado [${socket.id}]`);

    // Envío inmediato (evita pantalla vacía)
    try {
      const initialStats = await getSystemStats();
      socket.emit('monlive-data', initialStats);
    } catch (err) {
      console.error('Error inicial:', err.message);
    }

    const interval = setInterval(async () => {
      if (!socket.connected) return;

      try {
        const stats = await getSystemStats();
        socket.emit('monlive-data', stats);
      } catch (error) {
        console.error('Error métricas:', error.message);
      }
    }, config.refreshInterval);

    socket.on('disconnect', () => {
      clearInterval(interval);
      console.log(`Cliente desconectado [${socket.id}]`);
    });
  });
}

module.exports = monitorSocket;
