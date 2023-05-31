const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHeandler = require('../errors/errorHeandler');
const { generateToken } = require('../utils/token');

module.exports.getCurrentUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(201).json({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id }, '24h');

      res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
        .send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
    })
    .catch((err) => { next(errorHeandler(err)); });
};
