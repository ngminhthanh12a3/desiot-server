# desiot

# Semantic versioning

## 1.3.0

`24-06-2034`

- Setup **/dashboard/device** for users to create a device profile.

  - **config/config.ts**

  ```ts
  {
    name: 'device',
    icon: 'smile',
    path: '/dashboard/device',
    component: './dashboard/device',
  },
  ```

  - Make directory **src/pages/dashboard/device**

    - index.tsx

      ```tsx
      import type { FC } from 'react';

      const DevicePage: FC = () => {
        return <></>;
      };

      export default DevicePage;
      ```

  - Edit file **src/locales/en-US/menu.ts**
  - Disable notices.

## 1.2.0

`23-06-2023`

- Setup front-end to create a gateway in the database.
  - Create Ant Design Pro project by pro-cli.
  - Use no-mock mode(start:no-mock) and proxy to connect to the server.
  - Setup umi_locale localStorage in src/global.ts
    ```ts
    const currentUmiLocale = localStorage.getItem('umi_locale');
    if (!currentUmiLocale) {
      const defaultLocale = 'en-US';
      localStorage.setItem('umi_locale', defaultLocale);
    }
    ```
  - Set title of config file (**config\defaultSettings.ts**) and login file (**src/pages/user/Login/index.tsx**).
  - Set contents in locale folder (**src/locales**)
    - pages.layouts.userLayout.title
    - app.copyright.produce
  - Create **/api/currentUser** api in the server.
  - Create **controller.user.currentUser**
  - Create **/api/login/account** api and **controller.user.loginAccount**
  - Config config/plugin.js
    ```ts
    security: {
      enable: false,
    }
    ```
  - Config config/config.default.js
    ```ts
      session: {
      key: 'EGG_SESS',
      maxAge: 24 * 3600 * 1000, // 1 day
      httpOnly: true,
      encrypt: true,
    },
    ```
  - Create **/api/login/outLogin** api and **controller.user.outLogin**.

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
