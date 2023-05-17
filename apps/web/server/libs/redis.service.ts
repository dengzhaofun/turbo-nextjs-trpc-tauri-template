
import Redis from "ioredis";
import { singleton } from "tsyringe";


@singleton()
export default class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL || "");
  }

  public getClient(): Redis {
    return this.client;
  }
}
