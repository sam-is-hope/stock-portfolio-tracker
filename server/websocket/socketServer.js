const { Server } = require('socket.io');
const logger = require('../utils/logger');

let io = null;

const initSocketServer = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  io.on('connection', (socket) => {
    logger.info(`WebSocket channel connection initiated: Client socket sequence ID [${socket.id}]`);
    
    socket.on('subscribe_ticker', (symbol) => {
      socket.join(symbol.toUpperCase());
    });

    socket.on('disconnect', () => {
      logger.info(`WebSocket channel disconnected safely: [${socket.id}]`);
    });
  });

  return io;
};

const getIoInstance = () => io;

module.exports = { initSocketServer, getIoInstance };
