const { celebrate, Joi } = require('celebrate');

const {
  URL_REG_EXP,
} = require('./constants');

const id = Joi.string().hex().required().length(24);
const email = Joi.string().required().email();
const name = Joi.string().required().min(2).max(30);
const password = Joi.string().required().min(4).max(30);
const link = Joi.string().required().pattern(URL_REG_EXP);
const text = Joi.string().required();
const number = Joi.number().integer().positive().required();

const JOI_PRESETS = {
  updateUserInfo: celebrate({
    body: Joi.object().keys({
      email,
      name,
    }),
  }),
  createUser: celebrate({
    body: Joi.object().keys({
      email,
      password,
      name,
    }),
  }),
  login: celebrate({
    body: Joi.object().keys({
      email,
      password,
    }),
  }),
  createMovie: celebrate({
    body: Joi.object().keys({
      country: text,
      director: name,
      duration: number,
      year: text,
      description: text,
      image: link,
      trailer: link,
      thumbnail: link,
      movieId: number,
      nameRU: text,
      nameEN: text,
    }),
  }),
  actMovieById: celebrate({
    params: Joi.object().keys({
      movieId: id,
    }),
  }),
};

module.exports = {
  JOI_PRESETS,
};
