# desiot

# Semantic versioning

## 1.7.0

`27-06-2023`

- Handle onClick of a device name.
  - Navigate to a info page of the device
- Config **config/config.ts** and **menu.ts**
- Config PageContainer of the device page.
- Fix outlogin controller.
- Pass **filter** to the device page.
<!-- - Find all device doc to the info page.
  - Change global style.
  - Load sidebar content and change its background opacity.
  - Create a list container
  - Get root location, and push location when click
  - Get all devices and change the **filter** param of the **api/device**. -->
- Hide root route of device.
  - Create page container of the ifno page.
  - Get device name and pass it to the title
  - Create **show** method in **controller.device**

## 1.6.0

`26-06-2023`

- Create the event allowing to click on a config profile.
  - Forward the location of the window to the ID path URL.
  - Create **profile** dir in the page of **configuration**.
  - Config the **config/config.ts**
  - Change **menu.ts**
  - Custom the **pageContainer** to display the name of the profile.
    - Get profile's data by the param.
    - Create **show** method on **configs** controller.
    - Create **findOne** method in **configs** service.
- Create a device tab in the config page **based on src/pages/list/search**.
  - Config the **config/config.ts** file.
  - Create the **src/pages/dashboard/profile/device** folder and **index.tsx**.
  - Modify **menu.ts**.
- Create a table with add button **based on src/pages/list/table-list**
- Make a request requiring to create a device with name field.
  - Set name field in type and modal form.
  - Create a resources handler in the router of the server. **controller.device**
  - Create **create** method in the device service.
    - Modify the Device Model.
  - Modify ID Param in the **config/config.ts** and Profile tsx.
  - Update device table when adding and initialization.
    - Create **findDevice** in the web with **rule** service.
  - Create the **index** method on **device** controller.
    - Create **find** method in **device** service. (with query)

## 1.5.0

`26-06-2023`

- Create a service store new configuration
  - Create populate with a certain user.
  - Create user model and a temporary user document.
  - Create findOne service for user model.
- Edit configuration page in routes and menu.
- Load configurations into the list of the dashboard.
  - Create index controller of the configs.
  - Create "find" service for config model.
  - Update the list when add completely.

## 1.4.0

`25-06-2023`

- Route to main page as device.
  ```ts
  {
    path: '/',
    redirect: '/dashboard/device',
  },
  ```
- Create path for configuration page.

  - **config/config.ts**
    ```ts
    {
      name: 'configuration',
      icon: 'smile',
      path: '/dashboard/configuration',
      component: './dashboard/configuration',
    },
    ```
  - Make directory **src/pages/dashboard/configuration**
  - **index.tsx**

    ```tsx
    import { PageContainer } from '@ant-design/pro-layout';
    import { FC } from 'react';

    const ConfigurationPage: FC = () => {
      return <PageContainer></PageContainer>;
    };

    export default ConfigurationPage;
    ```

  - **src/locales/en-US/menu.ts**
    ```ts
    'menu.dashboard.configuration': 'Configuration',
    ```
  - In stall \*_@ant-design/pro-components_
  - Create button to create a config (follow **src/pages/list/card-list**).
    - Copy **utils** folder and **style.less** file
    - Create a list with temporary data type in **data.d.ts**
    - Set up the List attributes: rowKey, loading ...
      - Create temporary service for loading.
    - Create [modal form](https://procomponents.ant.design/en-US/components/modal-form#modal-forms) component for the new config button.
    - Handle onClick event for the button
    - Create newConfig service

## 1.3.1

`25-06-2023`

- Fix webpack error ERR_OSSL_EVP_UNSUPPORTED ny **NODE_OPTIONS=--openssl-legacy-provider**

## 1.3.0

`24-06-2023`

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
