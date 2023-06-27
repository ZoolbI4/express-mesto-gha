const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
<<<<<<< HEAD
const NotFound = require('../errors/NotFoundError');
=======
const { NOT_FOUND } = require('../utils/error');
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

<<<<<<< HEAD
router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не существует'));
=======
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Сервер не найден' });
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
});

module.exports = router;
