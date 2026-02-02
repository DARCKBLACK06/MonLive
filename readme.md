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

## Exponer el servidor públicamente con LocalTunnel (opcional)

Si quieres que tu servidor local sea accesible desde Internet (por ejemplo, para mostrar el dashboard a otra persona o probar webhooks), puedes usar LocalTunnel para crear una URL pública que redirija a tu `localhost`.

- ¿Qué es LocalTunnel?

  LocalTunnel es una utilidad que crea un túnel seguro desde una URL pública en internet hasta tu servidor local. Permite compartir rápidamente un servicio que está corriendo en `localhost` sin desplegarlo en un servidor público.

- Instalación (opcional):

  Para usar el comando `lt` (atajo), instala LocalTunnel globalmente:

  ```bash
  npm install -g localtunnel
  ```

  Si no quieres instalarlo globalmente, puedes usar `npx` (ejecuta la versión remota sin instalación global):

  ```bash
  npx localtunnel --port 8000
  ```

- Uso básico:

  Ejecuta LocalTunnel apuntando al puerto donde corre MonLive (por defecto 8000):

  ```bash
  lt --port 8000
  ```

  Al ejecutar el comando verás una URL pública (por ejemplo `https://random-subdomain.loca.lt`) que podrás compartir para acceder al dashboard desde cualquier lugar.

- Notas y seguridad:

  - El comando `lt` requiere que LocalTunnel esté instalado globalmente; si usas `npx` no necesitarás la instalación global.
  - Ten en cuenta que exponer tu servicio a Internet puede implicar riesgos de seguridad. Úsalo sólo cuando confíes en las personas con las que compartes la URL y evita exponer servicios sensibles.
  - LocalTunnel es útil para demostraciones temporales y pruebas, pero para producción se recomiendan soluciones más robustas y configuradas (servidores con HTTPS, autenticación, firewall, etc.).


## Licencia

(Añade la licencia si procede)