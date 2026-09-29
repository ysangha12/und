const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;
const clients = new Map();

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(__dirname, requestedPath);
  if (!filePath.startsWith(__dirname) || !fs.existsSync(filePath)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
  };
  const extension = path.extname(filePath);
  const contentType = contentTypes[extension] || 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(response);
});

const socketServer = new WebSocket.Server({ server });

function broadcast(message, except) {
  const payload = JSON.stringify(message);
  for (const client of clients.keys()) {
    if (client !== except && client.readyState === WebSocket.OPEN) client.send(payload);
  }
}

function roomPresence(room) {
  return [...clients.values()].filter(client => client.room === room).map(client => client.name);
}

function sendPresence(room) {
  broadcast({ type: 'presence', room, names: roomPresence(room) });
}

socketServer.on('connection', socket => {
  const client = { name: 'guest', room: '' };
  clients.set(socket, client);

  socket.on('message', rawMessage => {
    let message;
    try { message = JSON.parse(rawMessage.toString()); } catch { return; }

    if (message.type === 'join') {
      const previousRoom = client.room;
      client.name = String(message.name || 'guest').slice(0, 16);
      client.room = String(message.room || '').slice(0, 20);
      if (previousRoom) sendPresence(previousRoom);
      sendPresence(client.room);
      return;
    }

    if (message.type === 'chat' && client.room && String(message.text || '').trim()) {
      broadcast({ type: 'chat', room: client.room, name: client.name, text: String(message.text).slice(0, 300) }, socket);
      return;
    }

    if (message.type === 'action' && client.room) {
      const allowedActions = new Set(['sushi-eat', 'smoke', 'soft-press', 'soft-move', 'soft-release', 'dance']);
      if (!allowedActions.has(message.action)) return;
      broadcast({ type: 'action', room: client.room, action: message.action, payload: message.payload || {} }, socket);
    }
  });

  socket.on('close', () => {
    const room = client.room;
    clients.delete(socket);
    if (room) sendPresence(room);
  });
});

server.listen(port, () => console.log(`und club is running at http://localhost:${port}`));
