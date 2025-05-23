export interface AWSConfig {
  region: string;
  credentials: Credentials | Credentials[];
}

interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
}
