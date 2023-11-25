'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.get('/api/currentUser', controller.user.currentUser);
  router.post('/api/login/account', controller.user.loginAccount);
  router.post('/api/login/outLogin', controller.user.outLogin);
  router.post('/api/dsp/digital_filtering', controller.dsp.digital_filtering);
  const checkUser = middleware.checkUser({});
  router.resources('configs', '/api/configs', checkUser, controller.configs);
  router.resources('device', '/api/device', checkUser, controller.device);
  router.resources('vstorage', '/api/vstorage', checkUser, controller.vstorage);
  router.resources('ui', '/api/UI', checkUser, controller.ui);
};
