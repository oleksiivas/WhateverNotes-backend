const express = require('express');
const {body, check}  = require('express-validator/check');
const User = require ('../models/user');
const router = express.Router();
const authControllers = require('../controllers/auth');



router.post('/login', 
[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password', 'Password has to be valid.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()

],
authControllers.postLogin);

router.post('/signup', 
[
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'This email exists already, please pick a different one.'
          );
        }
      });
    })
    .normalizeEmail(),
  body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  )
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()
    
],
 authControllers.postSignup);




module.exports = router;