const mongoose = require('mongoose');
<<<<<<< HEAD
const isUrl = require('validator/lib/isURL');
=======
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
<<<<<<< HEAD
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
=======
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
