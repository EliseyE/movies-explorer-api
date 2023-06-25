const {
  INTERNAL_SERVER_ERROR_CODE,
} = require('./error-codes');

const centralErrorUnit = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;

  res.status(statusCode).json({ message: statusCode === INTERNAL_SERVER_ERROR_CODE ? 'На сервере произошла ошибка.' : message });
  next();
};

module.exports = centralErrorUnit;
