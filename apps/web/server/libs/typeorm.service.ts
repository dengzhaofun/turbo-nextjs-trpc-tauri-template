
import { container, injectable, singleton } from "tsyringe";
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


@singleton()
export default class TypeormService {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      url: `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}${process.env.PG_APPNAME ? `?application_name=${process.env.PG_APPNAME}` : ''}`,
      synchronize: process.env.PG_SYNC === "true",
      logging: process.env.LOGGING === "true",
      poolSize: parseInt(process.env.PG_POOL_SIZE!),
      entities: [],
      subscribers: [],
      migrations: [],
      namingStrategy: new SnakeNamingStrategy(),
  });
  }

  async init() {
    return this.dataSource.initialize().catch((error) => console.log(error));
  }

  inited(): boolean {
    return this.dataSource.isInitialized;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
