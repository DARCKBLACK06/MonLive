const si = require('systeminformation');

/* =========================
   CACHE (sensores pesados)
========================= */
let gpuCache = { name: 'N/A', temp: 0, load: 0 };
let diskCache = { used: 0 };
let lastGpuRead = 0;
let lastDiskRead = 0;

const GPU_INTERVAL = 3000;   // 3 segundos
const DISK_INTERVAL = 5000; // 5 segundos

async function getGpuStats() {
  const now = Date.now();
  if (now - lastGpuRead < GPU_INTERVAL) return gpuCache;

  lastGpuRead = now;
  const graphics = await si.graphics();

  if (graphics.controllers.length > 0) {
    const gpu =
      graphics.controllers.find(g =>
        g.vendor?.toLowerCase().includes('nvidia')
      ) || graphics.controllers[0];

    gpuCache = {
      name: gpu.model || 'Unknown GPU',
      temp: gpu.temperatureGpu ?? 0,
      load: gpu.utilizationGpu ?? 0
    };
  }

  return gpuCache;
}

async function getDiskStats() {
  const now = Date.now();
  if (now - lastDiskRead < DISK_INTERVAL) return diskCache;

  lastDiskRead = now;
  const disks = await si.fsSize();

  diskCache = {
    used: disks.length > 0 ? disks[0].use.toFixed(2) : 0
  };

  return diskCache;
}

/* =========================
   MAIN STATS
========================= */
async function getSystemStats() {
  const [
    cpuLoad,
    mem,
    cpuTemp,
    networks,
    time,
    gpu,
    disk
  ] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.cpuTemperature(),
    si.networkStats(),
    si.time(),
    getGpuStats(),
    getDiskStats()
  ]);

  /* =========================
     RED (evitar loopback)
  ========================= */
  const net = networks.find(n => n.iface !== 'lo') || networks[0] || {};
  const rx = net.rx_sec ? (net.rx_sec / 1024).toFixed(2) : 0;
  const tx = net.tx_sec ? (net.tx_sec / 1024).toFixed(2) : 0;

  return {
    cpu: cpuLoad.currentLoad.toFixed(2),
    ram: ((mem.active / mem.total) * 100).toFixed(2),
    temp: cpuTemp.main || 0,

    disk,

    network: {
      rx,
      tx
    },

    gpu,

    uptime: Math.floor(time.uptime / 60) // minutos
  };
}

module.exports = { getSystemStats };
