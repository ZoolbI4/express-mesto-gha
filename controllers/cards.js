const Cards = require('../models/card');
<<<<<<< HEAD
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
=======
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/error');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' }));
};

const createCard = (req, res) => {
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
  const { name, link } = req.body;
  const owner = req.user._id;

  return Cards.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
<<<<<<< HEAD
        throw new BadRequest('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Cards.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка с указанным id не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Cards.findByIdAndRemove(cardId).then(() => res.status(200).send(card));
      }
      throw new ForbiddenError('В доступе отказано');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
=======
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Cards.findByIdAndRemove(cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
<<<<<<< HEAD
  ).orFail(() => {
    throw new NotFound('Передан несуществующий id карточки');
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки лайка'));
      }
      if (err.message === 'NotFound') {
        next(new NotFound('Передан несуществующий id карточки'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
=======
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
<<<<<<< HEAD
  ).orFail(() => {
    throw new NotFound('Передан несуществующий id карточки');
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для снятия лайка'));
      }
      if (err.message === 'NotFound') {
        next(new NotFound('Передан несуществующий id карточки'));
      }
      next(err);
=======
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
