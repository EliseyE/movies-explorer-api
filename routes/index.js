const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signinRouter = require('./signin');
const logoutRouter = require('./logout');
const signupRouter = require('./signup');
const jwtcheckRouter = require('./jwtcheck');
const { auth } = require('../middlewares/auth');
const { cors } = require('../middlewares/cors');

const NotFoundError = require('../errors/not-found-error');

router.use(cors);

router.use('/jwtcheck', auth, jwtcheckRouter);
router.use('/signin', signinRouter);
router.use('/logout', logoutRouter);
router.use('/signup', signupRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
