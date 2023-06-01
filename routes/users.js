const usersRouter = require('express').Router();

const {
  JOI_PRESETS,
} = require('../appConfig');

const {
  getCurrentUserInfo, updateUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUserInfo);
usersRouter.patch('/me', JOI_PRESETS.updateUserInfo, updateUserInfo);

module.exports = usersRouter;
