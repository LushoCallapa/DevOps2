import winston from "winston";
import LokiTransport from "winston-loki";

const lokiTransport = new LokiTransport({
  host: process.env.LOKI_URL || "http://loki:3100",  // URL de Loki desde Docker Compose
  json: true,
  labels: { app: "myapp" },
  interval: 5,  // segundos para enviar lotes
});

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(), // también imprime en consola
    lokiTransport,
  ],
});

export const logEvent = (message: string) => {
  logger.info(message);
};
