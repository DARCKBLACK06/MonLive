const socket = io('/monlive');

/* =========================
   ELEMENTOS HTML
========================= */
const cpuText = document.getElementById('cpu');
const ramText = document.getElementById('ram');
const tempText = document.getElementById('temp');
const diskText = document.getElementById('disk');
const statusText = document.getElementById('status');
const gpuTempText = document.getElementById('gpu-temp');
const gpuNameText = document.getElementById('gpu-name');
const uptimeText = document.getElementById('uptime');

/* =========================
   ESTADO DE CONEXIÓN
========================= */
socket.on('connect', () => {
  statusText.textContent = 'Conectado';
  statusText.style.color = '#2ecc71';
});

socket.on('disconnect', () => {
  statusText.textContent = 'Desconectado';
  statusText.style.color = '#e74c3c';
});

/* =========================
   UMBRALES (ALERTAS)
========================= */
const THRESHOLDS = {
  cpu: 80,
  ram: 85,
  gpuTemp: 75
};

function applyAlert(element, value, limit) {
  if (value >= limit) {
    element.classList.add('alert');
  } else {
    element.classList.remove('alert');
  }
}

/* =========================
   GRÁFICA CPU + RAM
========================= */
const usageCtx = document.getElementById('usageChart').getContext('2d');
const usageChart = new Chart(usageCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'CPU (%)',
        data: [],
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'RAM (%)',
        data: [],
        borderWidth: 2,
        tension: 0.4
      }
    ]
  },
  options: {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100 }
    }
  }
});

/* =========================
   GRÁFICA GPU TEMP
========================= */
const gpuCtx = document.getElementById('gpuChart').getContext('2d');
const gpuChart = new Chart(gpuCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'GPU Temp (°C)',
        data: [],
        borderWidth: 2,
        tension: 0.4
      }
    ]
  },
  options: {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100 }
    }
  }
});

/* =========================
   RECEPCIÓN DE DATOS
========================= */
socket.on('monlive-data', (data) => {
  const time = new Date().toLocaleTimeString();

  /* --- TEXTO --- */
  cpuText.textContent = `${data.cpu}%`;
  ramText.textContent = `${data.ram}%`;
  tempText.textContent = `${data.temp}°C`;
  diskText.textContent = `${data.disk.used}%`;

  applyAlert(cpuText, data.cpu, THRESHOLDS.cpu);
  applyAlert(ramText, data.ram, THRESHOLDS.ram);

  /* --- CPU & RAM --- */
  usageChart.data.labels.push(time);
  usageChart.data.datasets[0].data.push(data.cpu);
  usageChart.data.datasets[1].data.push(data.ram);

  if (usageChart.data.labels.length > 30) {
    usageChart.data.labels.shift();
    usageChart.data.datasets.forEach(ds => ds.data.shift());
  }

  usageChart.update('none');

  /* --- GPU --- */
  if (data.gpu) {
    gpuTempText.textContent = `${data.gpu.temp}°C`;
    gpuNameText.textContent = data.gpu.name;

    applyAlert(gpuTempText, data.gpu.temp, THRESHOLDS.gpuTemp);

    gpuChart.data.labels.push(time);
    gpuChart.data.datasets[0].data.push(data.gpu.temp);

    if (gpuChart.data.labels.length > 30) {
      gpuChart.data.labels.shift();
      gpuChart.data.datasets[0].data.shift();
    }

    gpuChart.update('none');
  }

  /* --- UPTIME --- */
  if (data.uptime !== undefined) {
    uptimeText.textContent = `${data.uptime} min`;
  }

});
