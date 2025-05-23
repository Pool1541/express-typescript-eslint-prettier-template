import { PutLogEventsCommand, PutLogEventsCommandInput } from "@aws-sdk/client-cloudwatch-logs";
import { client } from "./client";
import { LOG_GROUP_NAME, LOG_STREAM_NAME } from "@/config/constants";
import { EnvType, Logger, CreateLoggerDTO } from "@/types/logger";

export async function logger(values: CreateLoggerDTO) {
  try {
    const message = buildLoggerInfo(values);
    const timestamp = (JSON.parse(message) as Logger).timestamp;
    const params: PutLogEventsCommandInput = {
      logGroupName: LOG_GROUP_NAME,
      logStreamName: LOG_STREAM_NAME,
      logEvents: [
        {
          message,
          timestamp,
        },
      ],
    };

    const command = new PutLogEventsCommand(params);
    await client.send(command);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

function buildLoggerInfo(values: CreateLoggerDTO) {
  const timestamp = new Date().getTime();
  const env = (process.env.NODE_ENV ?? "development") as EnvType;
  const loggerInfo: Logger = {
    timestamp,
    env,
    ...values,
  };

  return JSON.stringify(loggerInfo);
}
