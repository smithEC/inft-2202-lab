import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'product-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.info(new winston.transports.Console({
    format: winston.format.simple()
  }));
}