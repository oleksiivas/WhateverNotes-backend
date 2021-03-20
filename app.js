const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 5500

const app = express();

const ponder8Routes = require('./routes/ponder08');
const groupRoutes = require('./routes/groupRouter');
const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');
const noteRoutes = require('./routes/note');

app.use(bodyParser.json({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))
    .use('/ponder8', ponder8Routes)
    .use('/groups', groupRoutes)
    .use('/auth', authRoutes)
    .use('/note', noteRoutes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res, next) => {
        res.render('pages/app', {
            title: 'Whatever Notes',
            path: '/'
        });
    });

mongoose.connect(process.env.DATABASE_URL)
    .then(result => {
        app.listen(PORT);
        console.log(`\nconnected to the database!!! :D
            listening on port ${PORT}.
            URL: localhost:${PORT}`);
    })
    .catch(err => {
        console.log(err);
    });