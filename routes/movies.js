const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  JOI_PRESETS,
} = require('../appConfig');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', JOI_PRESETS.createMovie, createMovie);
moviesRouter.delete('/:movieId', JOI_PRESETS.actMovieById, deleteMovie);

module.exports = moviesRouter;
