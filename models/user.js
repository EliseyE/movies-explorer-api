const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'User with such an email already exists'],
      required: [true, 'Required field email'],
      lowercase: true,
      validate: {
        validator(v) { return isEmail(v); },
        message: (props) => `Incorrect email format: ${props.value}`,
      },
    },
    password: {
      type: String,
      required: [true, 'Required field password'],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Min length is 2 symbols. Current data is less than 2 symbols'],
      maxlength: [30, 'Max length is 30 symbols. Current data is more than 30 symbols'],
      default: 'Жан-Люк Годар',
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль. '));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль. '));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
