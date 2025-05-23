/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRequest } from "@/middlewares/persist-request";
import { logger } from "./logger";

class HTTPLogger {
  async success(message: string, userId?: string) {
    const req = getRequest()!;

    await logger({
      level: "info",
      message: message,
      meta: {
        method: req.method,
        protocol: req.protocol,
        route: req.route?.path,
      },
      traceId: crypto.randomUUID(),
      userId,
    });
  }

  async error(message: string, userId?: string) {
    const req = getRequest()!;

    await logger({
      level: "error",
      message: message,
      meta: {
        method: req.method,
        protocol: req.protocol,
        route: req.route?.path,
      },
      traceId: crypto.randomUUID(),
      userId,
    });
  }
}

export const HttpLogger = new HTTPLogger();
