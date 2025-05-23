import { config } from "./../aws/config";
import { CloudWatchLogsClient, CloudWatchLogsClientConfig } from "@aws-sdk/client-cloudwatch-logs";

const cloudWatchClientConfig = config as CloudWatchLogsClientConfig;

const clientConfig: CloudWatchLogsClientConfig = {
  ...cloudWatchClientConfig,
};

export const client = new CloudWatchLogsClient(clientConfig);
