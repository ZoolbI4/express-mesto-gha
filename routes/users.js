const router = require('express').Router();
const {
  getUsers,
  getUser,
<<<<<<< HEAD
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validationUserId, getUser);
router.patch('/me', validationUpdateProfile, updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);
=======
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985

module.exports = router;
