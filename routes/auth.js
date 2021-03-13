
const express = require('express');
const {body}  = require('express-validator/check');

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

authControllers.postLogin );
router.post('/signup', 


authControllers.postSignup);




module.exports = router;






