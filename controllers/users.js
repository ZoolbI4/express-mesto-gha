<<<<<<< HEAD
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super_secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => res.status(200).send({
          data: {
            name, about, avatar, email,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            return next(new BadRequest('Введены некорретные данные'));
          }
          next(err);
        });
    }).catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const updateUser = (req, res, next, newData) => {
=======
const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
    });
};

const updateUser = (req, res, newData) => {
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
<<<<<<< HEAD
  ).orFail(() => {
    throw new NotFound('Пользователь с указанным id не найден');
  })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  return updateUser(req, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return updateUser(req, res, next, { avatar });
=======
  ).orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Что-то пошло не так, ошибка сервера' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return updateUser(req, res, { name, about });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return updateUser(req, res, { avatar });
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
};

module.exports = {
  getUsers,
  getUser,
<<<<<<< HEAD
  login,
  createUser,
  getCurrentUser,
=======
  createUser,
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
  updateProfile,
  updateAvatar,
};
