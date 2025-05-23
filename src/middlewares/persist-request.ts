/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncLocalStorage } from "async_hooks";
import { Request } from "express";

const asyncLocalStorage = new AsyncLocalStorage<{ req: Request }>();

export function requestContextMiddleware(req: Request, res: any, next: any) {
  asyncLocalStorage.run({ req }, () => next());
}

export function getRequest() {
  return asyncLocalStorage.getStore()?.req;
}
