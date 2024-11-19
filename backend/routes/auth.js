const express = require('express');
const { signup, login, getProfile } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/rest-password');
router.put('/logout');
router.put('/update-Profile');
router.delete('./delete-account');

router.get('/check-user')

module.exports = router;