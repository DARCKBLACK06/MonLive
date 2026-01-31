module.exports = {
  appName: "MonLive",

  // Intervalo de actualización (ms)
  refreshInterval: 800,

  // Umbrales de alerta
  thresholds: {
    cpu: 80,      // %
    ram: 80,      // %
    temp: 75,     // °C CPU
    gpuTemp: 75   // °C GPU
  }
};
