const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    });
    logger.info(`MongoDB Connected Successfully: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      logger.error(`Database runtime connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection disconnected. Attempting reconnection...');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination.');
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Database Connection Failure Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
