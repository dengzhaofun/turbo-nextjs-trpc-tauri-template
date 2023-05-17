import { container } from "tsyringe";
import TypeormService from "../libs/typeorm.service";


export const typeormMiddleware = async (opts: any) => {
  if (!container.resolve(TypeormService).inited()) {
    await container.resolve(TypeormService).init();
  }
  return opts.next();
};
