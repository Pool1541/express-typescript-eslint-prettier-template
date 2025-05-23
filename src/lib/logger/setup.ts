import { LOG_GROUP_NAME, LOG_STREAM_NAME } from "@/config/constants";
import { createLogGroup, createLogStream, describeLogGroups, describeLogStream } from "./commands";

export async function initLogging() {
  try {
    const describeLogGroupsResponse = await describeLogGroups(LOG_GROUP_NAME);
    const logGroups = describeLogGroupsResponse?.logGroups;
    const logGroupExist = logGroups?.some((group) => group.logGroupName === LOG_GROUP_NAME);

    if (!logGroupExist) {
      await createLogGroup(LOG_GROUP_NAME);
      console.log("Log Group created successfully.");
    } else {
      console.log("Log Group already exists.");
    }

    const describeLogStreamsResponse = await describeLogStream(LOG_GROUP_NAME, LOG_STREAM_NAME);
    const logStreams = describeLogStreamsResponse?.logStreams;
    const logStreamExist = logStreams?.some((stream) => stream.logStreamName === LOG_STREAM_NAME);

    if (!logStreamExist) {
      await createLogStream(LOG_GROUP_NAME, LOG_STREAM_NAME);
      console.log("Log Stream created successfully.");
    } else {
      console.log("Log Stream already exists.");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}
