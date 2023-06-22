import { MqttClient } from 'mqtt';

interface EggMqttClientOption {
  /// host e.g. 'mysql.com'
  host: string;
  /// port e.g. '3306'
  port: string;
  /// username e.g. 'test_user'
  username: string;
  // password e.g. 'test_password'
  password: string;
}

interface EggMqttConfig {
  default?: object;
  app?: boolean;
  agent?: boolean;
  client?: EggMqttClientOption;
}

declare module 'egg' {
  interface Application {
    mqttclient: MqttClient;
  }
  interface EggAppConfig {
    mqttclient: EggMqttConfig;
  }
}
