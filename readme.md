# MonLive

**MonLive** es una aplicación web de **monitoreo remoto en tiempo real** desarrollada con **Node.js**, diseñada para visualizar métricas críticas de un servidor o equipo local desde cualquier navegador.

El sistema recopila información del hardware y la transmite mediante **WebSockets**, mostrando los datos en un dashboard moderno y responsivo.

## Características

- Monitoreo en tiempo real (CPU, RAM, Disco)
- Temperatura del CPU
- Monitoreo de GPU (prioriza NVIDIA)
- Estadísticas de red (RX / TX)
- Tiempo de actividad del sistema (uptime)
- Actualización en vivo sin recargar la página
- Dashboard limpio y moderno

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- Socket.IO
- systeminformation

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js

## Requisitos

- Node.js v18 o superior
- npm
- Navegador web moderno
- Sistema operativo compatible con `systeminformation`

## Instalación

Desde una carpeta vacía del proyecto:

### 1. Inicializar el proyecto

```bash
npm init -y
```

### 2. Instalar dependencias

```bash
npm install express socket.io systeminformation
```

**Dependencias:**

| Paquete | Descripción |
|---------|-------------|
| express | Servidor web |
| socket.io | Comunicación en tiempo real |
| systeminformation | Obtención de métricas del sistema |

### 3. (Opcional) Instalar dependencia de desarrollo

```bash
npm install nodemon --save-dev
```

## Ejecución del servidor

```bash
node server.js
```

O en modo desarrollo:

```bash
npx nodemon server.js
```

Accede desde el navegador:

```
http://localhost:8000
```

