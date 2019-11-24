const express = require('express');

const { auth } = require('../controllers');
const { authUtil } = require('../utils');

const router = express.Router();

// Auth core routes
router.post('/signup', auth.signUp);
router.post('/signin', auth.signIn);
router.get('/signout', authUtil.verifyToken, authUtil.isLoggedIn, auth.signOut);
router.post('/resetPassword', auth.resetPassword);
router.post('/:id', auth.confirmSignUp);

module.exports = router;
