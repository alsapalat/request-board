const WebSocket = require('ws');
const _ = require('lodash');

const PING_WAIT = 5000;

class SocketServer {
  constructor (server, path) {
    this.clients = {};
    this.wss = new WebSocket.Server({
      server,
      path,
    });
  }

  start() {
    this.wss.on('connection', (ws) => {
      const id = require('./helper').uniqId();
      this.clients = {
        ...this.clients,
        [id]: ws,
      };
      let timeout;
      ws.on('message', (e) => {
        if (e !== '_ping') return;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          delete this.clients[id];
          console.log(`<${id}>: Disconnected ${Object.keys(this.clients).length} Client(s) Connected`);
          ws.close();
        }, PING_WAIT);
      });
      console.log(`<${id}>: Connected! ${Object.keys(this.clients).length} Client(s) Connected`);
    })
  }

  broadcast(message_object) {
    _.forOwn(this.clients, (v, k) => {
      const msg = JSON.stringify(message_object);
      console.log(`<${k}> ${JSON.stringify(msg)}`);
      v.send(msg);
    });
  }
}

module.exports = SocketServer;
