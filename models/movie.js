const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Required field country'],
    },
    director: {
      type: String,
      required: [true, 'Required field director'],
    },
    duration: {
      type: Number,
      required: [true, 'Required field duration'],
    },
    year: {
      type: Number,
      required: [true, 'Required field year'],
    },
    description: {
      type: String,
      required: [true, 'Required field description'],
    },
    image: {
      type: String,
      required: [true, 'Required field image'],
      validate: {
        validator(v) { return isURL(v); },
        message: (props) => `Incorrect url format: ${props.value}`,
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Required field trailerLink'],
      validate: {
        validator(v) { return isURL(v); },
        message: (props) => `Incorrect url format: ${props.value}`,
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Required field thumbnail'],
      validate: {
        validator(v) { return isURL(v); },
        message: (props) => `Incorrect url format: ${props.value}`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Required field owner'],
    },
    movieId: {
      type: Number,
      required: [true, 'Required field movieId'],
    },
    nameRU: {
      type: String,
      required: [true, 'Required field nameRU'],
    },
    nameEN: {
      type: String,
      required: [true, 'Required field nameEN'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
