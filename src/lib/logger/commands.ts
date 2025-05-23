import { CreateLogGroupCommand, CreateLogStreamCommand, DescribeLogGroupsCommand, DescribeLogStreamsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { client } from "./client";

export async function createLogGroup(logGroupName: string) {
  const command = new CreateLogGroupCommand({
    logGroupName: logGroupName,
  });
  try {
    return await client.send(command);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export async function describeLogGroups(prefix?: string) {
  const command = new DescribeLogGroupsCommand({ logGroupNamePrefix: prefix });
  try {
    return await client.send(command);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export async function createLogStream(logGroupName: string, logStreamName: string) {
  const command = new CreateLogStreamCommand({ logGroupName, logStreamName });
  try {
    return await client.send(command);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export async function describeLogStream(logGroupName?: string, logStreamName?: string) {
  const command = new DescribeLogStreamsCommand({ logStreamNamePrefix: logStreamName, logGroupName });
  try {
    return await client.send(command);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}
