# desiot

# Semantic versioning

## 1.1.0

`23-06-2023`

- Handle command of virtual storage writing.
  - Get gateway id (12 byte).
  - Get connection type and connection ID.
  - Setup database plugin.
    - Setup database npm workspace.
    - Setup database configuration in ./server/config/config.default.js and plugin.js.
    - Setup egg-plugin command.
    - Install mongoose by npm.
    - Add index.d.ts
      ```ts
      declare module 'egg' {
        interface Application {
          mqttclient: MqttClient;
        }
        interface EggAppConfig {
          mqttclient: EggMqttConfig;
        }
      }
      ```
    - Add app.js, agent.js, and config ./config/config.default.js
    - Create general device colection service and query.

## 1.0.0

`22-06-2023`

- Parse the received frame.
  ```js
  // Cast U8 array to U16 array (2 array in the same buffer)
  const payload = new Buffer();
  const payloadU8Buf = new Uint8Array(payload);
  const payloadU16Buf = new Uint16Array(payloadU8Buf.buffer);
  ```
  - Config for multiple parsing module based on class

## 0.0.0

`22-06-2023`

- Add app.js.
- Init npm workspace for mqttclient.
- Add config to plugin.js.
- Add genernal config to congif.default.js
- Init egg plugin in **/lib/plugin/egg-mqttclient**.
  - Add **app.js**.
  - Config **config/config.default.js**
  - Add **lib/mqttclient.js**
  - Add **index.d.ts**
  - Declare module 'egg'
    - interface Application
    - interface EggAppConfig
    - EggMqttClientOption
  - Check MQTT client connections and listen to initial topic.

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
