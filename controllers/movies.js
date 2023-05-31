const Movie = require('../models/movie');
const errorHeandler = require('../errors/errorHeandler');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.json(movies.reverse()))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.find({ owner: req.user._id })
    .then((movies) => movies.findIndex((item) => item.movieId === movieId))
    .then((movieIsNotCreated) => {
      if (movieIsNotCreated === '-1') {
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink: trailer,
          thumbnail,
          movieId,
          nameRU,
          nameEN,
          owner,
        })
          .then((movie) => Movie.findById(movie._id))
          .then((movie) => res.status(201).json(movie))
          .catch((err) => { next(errorHeandler(err)); });
      } else throw new ConflictError(`Already exist in your saved movies: ${movieId} ${nameEN}`);
    })
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (userId !== movie.owner.toString()) throw new ForbiddenError('Access denied');
      movie.deleteOne({ _id: movieId });
      return movie;
    })
    .then((movie) => {
      res.json({ movie, message: 'The movie has been deleted' });
    })
    .catch((err) => { next(errorHeandler(err)); });
};
