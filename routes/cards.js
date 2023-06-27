const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
<<<<<<< HEAD
const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validations');

router.get('/', getCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationCardId, deleteCard);
router.put('/:cardId/likes', validationCardId, likeCard);
router.delete('/:cardId/likes', validationCardId, dislikeCard);
=======

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985

module.exports = router;
