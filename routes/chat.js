const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is_auth');

router.get('/', (req, res, next) => {
    res.render('pages/chat', {
        path: '/chat',
        title: 'Global Chat',
    });
});

module.exports = router;