import { WinstonTransport as AxiomTransport } from '@axiomhq/axiom-node';
import { singleton } from 'tsyringe';
import winston from 'winston';
const { combine, errors, json } = winston.format;

@singleton()
export default class WinstonService {
  private client: winston.Logger;

  constructor() {
    const axiomTransport = new AxiomTransport();
    this.client = winston.createLogger({
      level: 'info',
      format: combine(errors({ stack: true }), json()),
      defaultMeta: { },
      transports: [axiomTransport],
      exceptionHandlers: [axiomTransport],
      rejectionHandlers: [axiomTransport],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.client.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
  }

  public getClient(): winston.Logger {
    return this.client;
  }
}
