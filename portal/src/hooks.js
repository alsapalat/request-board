import React from 'react';

const PING_INTERVAL = 2000;
const wait = (t = 1000) => new Promise(r => setTimeout(r, t));
let ws;

export const useWebSocket = (url, callback) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const interval = React.useRef();
  const connect = () => {
    ws = new WebSocket(url);
    const reconnect = async () => {
      console.log('Disconnected...');
      await wait(10000);
      console.log('Reconnecting in 3...');
      await wait();
      console.log('Reconnecting in 2...');
      await wait();
      console.log('Reconnecting in 1...');
      await wait();
      connect();
    }
    ws.addEventListener('open', () => {
      setIsConnected(true);
      interval.current = setInterval(() => {
        ws.send('_ping');
      }, PING_INTERVAL);
    });
    ws.addEventListener('message', (e) => {
      if (typeof callback === 'function') callback(JSON.parse(e.data));
    });
    ws.addEventListener('close', (err) => {
      setIsConnected(false);
      clearInterval(interval.current);
      // reconnect();
    });
    ws.addEventListener('error', (err) => {
      console.log('Unable to connect!');
      setIsConnected(false);
      clearInterval(interval.current);
      reconnect();
    });
    return ws;
  }
  React.useEffect(() => {
    connect();
    return () => {
      try {
        clearInterval(interval.current);
        ws.close();
      } catch(err) {
        console.log(err); // eslint-disable-line
      }
    }
  }, [url]); // eslint-disable-line
  return [isConnected];
};
