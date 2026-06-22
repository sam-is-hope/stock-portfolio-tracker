const { getIoInstance } = require('./socketServer');

const broadcastPriceUpdate = (symbol, newPrice) => {
  const io = getIoInstance();
  if (io) {
    io.to(symbol.toUpperCase()).emit('price_update', {
      symbol: symbol.toUpperCase(),
      price: newPrice,
      timestamp: new Date()
    });
  }
};

module.exports = { broadcastPriceUpdate };
