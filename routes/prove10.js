const express = require('express');
const router = express.Router();

const controller = require('../controllers/prove10Controller');

router.get('/', controller.getPage)

router.post('/add-avenger', controller.postAddAvenger)

module.exports = router;