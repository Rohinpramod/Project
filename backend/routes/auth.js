const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { signup, login, getProfile, resetPassword, logout, profileUpdate, deleteUserAccount, checkUser } = require('../controllers/authControllers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile',authMiddleware, getProfile);
router.put('/rest-password',authMiddleware,resetPassword);
router.put('/logout',authMiddleware,logout);
router.put('/update-Profile',authMiddleware,profileUpdate);
router.delete('./delete-account',authMiddleware,deleteUserAccount);

router.get('/check-user',authMiddleware,checkUser)

module.exports = router;