'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/currentUser', controller.user.currentUser);
  router.post('/api/login/account', controller.user.loginAccount);
  router.post('/api/login/outLogin', controller.user.outLogin);

  router.resources('configs', '/api/configs', controller.configs);
  router.resources('device', '/api/device', controller.device);
  router.resources('vstorage', '/api/vstorage', controller.vstorage);
};
