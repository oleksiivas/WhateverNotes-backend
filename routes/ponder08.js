//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ponder8controller');

router.get('/', controller.getJson)

router.post('/', controller.getIndex)

module.exports = router;