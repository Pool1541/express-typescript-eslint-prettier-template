export interface Logger {
  level: LoggerLevelType;
  timestamp: number;
  message: string;
  context?: string;
  meta?: Record<string, string>;
  traceId?: string;
  userId?: string;
  env: EnvType;
}

export type CreateLoggerDTO = Omit<Logger, "timestamp" | "env">;

export type LoggerLevelType = "debug" | "info" | "warn" | "error";
export type EnvType = "development" | "production";
