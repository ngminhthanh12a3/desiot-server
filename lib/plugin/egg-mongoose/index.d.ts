import mongoose from 'mongoose';

interface EGGMongooseClient {
  connectionString: string;
  dbName: string;
  replicaSet: string;
  authSource: string;
  user: string;
  pass: string;
}

interface EggMongooseConfig {
  default?: object;
  app?: boolean;
  agent?: boolean;
  client?: EGGMongooseClient;
}

declare module 'egg' {
  interface Application {
    mongoose: Promise<typeof mongoose>;
  }
  interface EggAppConfig {
    mongoose: EggMongooseConfig;
  }
}
