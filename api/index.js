require('dotenv').config();

const express = require('express');
const http = require('http');
const SocketServer = require('./websocket');
const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(require('./middleware/cors'));

app.use(require('./routes'));

const socketServer = new SocketServer(server, '/ws');
socketServer.start();

server.listen(port, () => {
  console.log(`<API>[${process.env.NODE_ENV}]:${port}`);
});

module.exports = {
  socketServer,
};
