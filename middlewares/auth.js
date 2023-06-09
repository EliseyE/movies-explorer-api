require('dotenv').config();
const JWT = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET } = require('../appConfig');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return next(new UnauthorizedError('При авторизации произошла ошибка. Токен не передан или передан не в том формате'));

  let payload;

  try {
    payload = JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('При авторизации произошла ошибка. Переданный токен некорректен.'));
  }

  req.user = payload;
  return next();
};
