# desiot

# Semantic versioning

## 1.16.0

`13-07-2023`

- Add encryption method to frame handler and execute it when the frame parsed.
  - Update docker file for installing gcc compiler.
  - Add **c_files**.
  - Add execute handler.
  - Rebuild the server container.
- Create **PageContainer** content including copyable config_id.

## 1.15.1

`12-07-2023`

- Fix **vs_type** bug.

## 1.15.0

`12-07-2023`

- Create UI toolbox for switch component.
  - Setup default params to **DESIoT_DefaultUIComponentParams.ts**, **DESIoT_ItemDefaultConfig.ts**, and **DESIoT_AdditionalAttsOfDroppingItem.ts**.
  - Setup render component in **DOMGenerators.tsx** and **RunDOMGenerator.tsx**.
  - Create **VSUpdate** in **VSSync** model to update VS by using UI components.
  - Create **update** controller of VStorage.
  - Fix bug in **findOne** method of VStorage controller.
- Synchronize to device in **watch for change** method.
  - Send sync by class method.
    - Frame type : |H1|H2|CMD|DATA_LENGTH|CONNECT_TYPE|CONNECT_ID|DEVICE_DATA|T1|T2|CRC|.
- Fix **checkUser** bug.
- Fix **ItemDropdownModalForm** bug: not updating value when it closed.

## 1.14.0

`11-07-2023`

- Create ENV for CLIENT URL (**DESIOT_CLIENT_URL**).
- Using docker compose configs to run the server.

  - Create Makefile contain dev scrips (**dev-up**) for docker compose run.
  - Create docker-compose.yml and docker-compose.dev.yml
  - Set up configs for desiot-server service. (image, build.context,...)
  - Create Dockerfile-dev.
  - Add .dockerignore.

- Config PWA mode for client.
  - Enable pwa in **defaultSettings.ts**.
  - Add **manifest.json** to public dir.
  - Edit **document.ejs**.

## 1.13.0

`10-07-2023`

- Synchonize with VS of server by socket and socket client.
  - Install socket.io and socket.io-client.
  - Create plugin egg-socketio.
- Server Configs:
  - Edit **plugin.js**.
  - Add general configs in plugin dir and app dir(**config.default.js**).
  - Add **app.js** in plugin dir.
  - Test **server** event.
    ```js
    /**
     *
     * @param {Egg.Application} app
     */
    module.exports = (app) => {
      app.once('server', (server) => console.log(server));
    };
    ```
  - Add default socket.io config with dev client **localhost:8000**
  - Add **index.d.ts** for namespace egg -> Application.
- Client configs:
  - Connect to socket client when user id is exist.
  - Change **proxy.ts**.
- Fix **currentUser** controller send user password.
- Test mongoose wactch. Sample Update change stream:
  ```js
  const pipeline = [{ $match: { operationType: 'update' } }];
  const options = {
    fullDocument: 'updateLookup',
  };
  VStorage.watch(pipeline, options).on('change', (data) =>
    console.log('VStorage', data)
  );
  ```
  ```ts
  {
  _id: {
    _data: '8264AC9C31000000022B022C0100296E5A100444E0A1E75AAB409D9C20E655B97AACB846645F6964006464AA1D33CF45EC0504D5287E0004'
  },
  operationType: 'update',
  clusterTime: new Timestamp({ t: 1689033777, i: 2 }),
  wallTime: 2023-07-11T00:02:57.952Z,
  ns: { db: 'desiotapp', coll: 'vstorages' },
  documentKey: { _id: new ObjectId("64aa1d33cf45ec0504d5287e") },
  updateDescription: {
    updatedFields: { 'data.649f77183ffebb1238095b35': 20004 },
    removedFields: [],
    truncatedArrays: []
    }
  }
  ```
- Start DB watch for change when DB initialized completely.
- Nority change to client through socketio.
  - Emit to client throuth user_id.
  - Loop to check each **updatedFields** has **data.** pattern.
- Client:
  - Handle the data packet in general way.
- Remove unused locales and reconfig routes in **config.ts**.

## 1.12.0

`09-07-2023`

- Fix bug for load all UI. Pass config_id for fixing and make it a separate service.
- Create UI tab for device profile page.
- Make device route public. Position a layout has sidebar.
- Create a tab containing device list.
- Set default activeKey when list loaded.
- Display RGL UI on the layout of device info page.
- Get all UI items from db by service.
- Redirect to Ui tab when access to a profile. **config.ts** and **menu.ts**.
  - Create UI tabs for each UI dashboard.
  - Set activeKey and children for tabs when **onSuccess**.
  - Pass UI dashboard to each tab when request successfully.
- Config DOM generator for Run Items.
  - Config styles for container.
- Get initial content value for item.
  - Get initial method and curSynDev from VSSync model.
  - Create VSSync model.
  - Return initial VS content by manually run a request.
  - Set curSyncDev when access to profile page.
  - Create **show** method in vs torate controller.
  - Use EvenEmitter of **events** to synchonize with VS update.
  - Using **destroyInactivePane** :(.

## 1.11.0

`06-07-2023`

- Get UI data from server.
  - Use config ID from UI model, and update config_id when access to config profile.
- Display all UI from database in tab form.
  - Create UI **find** service in web and controller(index) in server.
  - Use user_id for config **find** method.
  - Create **name** field for ModalForm.
  - Create request for adding UI and **create** controller. (With config_id)
  - Concat UI items with key, labels, childrend.
- Mount a middleware for check user id. -> configs, device, vStorate, UI

  - Add **user** to device model

- Create route path for UI_id in **config.ts** and **menu.ts**
  - Handle tab key to redirect.
- Create default data for UI: items, layout, counter
  - Get UI data by ui_id and create **show** controller and service.
  - Create schema model for UI: items, layout, and counter.
  - Save UI data when submit by create request.
  - Create update controller and service.
  - Create handler for **add** action. Use Modal form with open and onOpenChange method.
  - Chage Reset button to set fields base in the initials.
  - Should put editable mode in separate route and remove setEditable in child components.
    - handle UI tabs error by **onTabClick**.
    - Create ReadOnlyUIDashboard route.
    - Return RGL with non-editable property. Push to editable route when clicking Edit button.
  - Create edit route in **config.ts** and **menu.ts**.
    - Return a editable layout and pass editable mode.
    - Submit form data by run method of useRequest.
    - Display editable items by its type.
    - Display title of an editable item by add more data to its configurations.
    - Add setting button to the DOM container to edit item configuration.
    - Place the modal form in the layout of the editable dashboard.
    - Use modal form to edit **title** and **storage** of the item.

## 1.10.0

`05-07-2023`

- Create a labal UI in toolbox in a **Space** component.
  - Crate label TSX component and cover it by a draggable container.
  - Remove padding for the first card child.
  - Get dropping element parameters from UI useModel.
  - Set dropping item when onDragStart.
  <!-- - Set UID by adding layouts length prefix. -->
  - Remove Defaule layout generator.
  - Update keys of layout items when **onChangeLayout** happened. -> Using **counter** method instead.
  - Add **type** attribute when the element being dropped.
  - Update minw, maxw, minh, maxh attributes of an item when it's on dropping.
  - Generate DOM for the label UI component.
    - Create UIDOMContainer TSX component.
    - Fix toolbox selectable by adding more css.
    - Rener DOM for editable UI component.
    - Fix **i** prop with hyphen. ex label-1.
    - Create editable DOM container in editabltDOMGenerator.
    - Separate the DOM generator.
    - Edit DOM container with dropdown menu when hover it.
    - Add **delete** menu in the dropdown and handle **onClick** event.
      - Restructoure the dropDown menu to a FC.
      - Run delete method in useModel. By pass reate states to useModel('UI');
    - Update layout data of form when **onLayoutChange**.
      - Set items depend on Form Change and view form **onFinish**.
      - Set items based on **form.setFieldValue**.
    - Update Items when **onFinish**
    - Remove **dNd** z-index when exit editable mode. Move **editable** to UI model.
    - Move counter to form.

## 1.9.0

`30-06-2023`

<!-- - Store **vs_data** to **VStorage** and create **findOneAndUpdate** method in the service.
- Create dashboard label UI for display VSData.
  - Create UI tab in Profile.
  - Add properties to **config.ts** and **menu.ts**
  - Create **UI** component page and return **ReactGridLayout**.
  - Install **npm i react-grid-layout lodash**
  - Return No Dragging Example, wrapped in a Proform to allow editting.
  - Create edit mode button and allow resizing and dragging when allowing editting.
  - Apply **Drag From Outside** example when in editable mode.
  - Create a drag item list, using layout, sidebar, and content components.
    - Install **rc-virtual-list** -->

- Remake the UI with form and Layout structure for the **toolbox** example.
  - Create form, pass editable mode.
  - Set drag and drop to add new item. Fix draggable bug for new item.

## 1.8.0

`30-06-2023`

- Get device ID from the frame.
  - Create **findOneAndUpdate** method for **device** service.
  - Update **DESIOT_FRAME** constant.
- Display **ID** column in the device table with copyable feature.
- Disable mock of user apis and **waterMarkProps**.
- S: Get gateway frame and device id.
  - Change **frameHandler** constants.
  - Fix **\0** error with Object ID.
  - Create **updateConnection** method.
  - Update VPin value with **config_id** and **device_id**.
  - Get **config_id** from the frame.
- S: Reconstruct the **frameHandler** constants.
- S: Create **VStorage** service.
  - Create **VStorage** model.
  - Set properties of **config_id**, **type**, **vs_id**, **data**. Set **required** fields.
- C: Create tab for Virtual Storage in **src/pages/dashboard/configuration/profile**.
  - Create route for **virtual storage** page and its directory. Also **menu.ts**
  - Create a table based on **/list/table-list**
  - Create **Modal form** button.
  - Set modal form fields. (General VS IDs)
  - S: Using index with unique of **vs_id** and **config_id** fields.
- C: Handle Submit of modal form.
  - S: Create router resource for **vstorage** controller.
  - Create **create** method on **vstorage** controller and service.
  - Add user field in the schema of VStorage.
  - Mutate added data, create **rule** request.
  - Create **index** method in **vstorage** controller and service.
  - Create cloumn types for VStorage table

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
