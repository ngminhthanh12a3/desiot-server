# desiot

# Semantic versioning

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
