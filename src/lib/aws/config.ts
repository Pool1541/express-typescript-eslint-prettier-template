import { AWSConfig } from "@/types/aws";

export const config: AWSConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
  region: process.env.REGION ?? "",
};
