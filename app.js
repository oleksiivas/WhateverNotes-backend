const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5500

const app = express();

const secrets = require('./secrets');
const ponder8Routes = require('./routes/ponder08');
const adminRoutes = require('./routes/admin');

app.use(express.static(path.join(__dirname, 'public')))
    .use('/ponder8', ponder8Routes)
    .use('/admin', adminRoutes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res, next) => {
        res.render('pages/app', {
            title: 'Whatever Notes',
            path: '/'
        });
    });

mongoose.connect(secrets.databaseUrl)
    .then(result => {
        app.listen(PORT);
        console.log('connected to the database!!! :D');
    })
    .catch(err => {
        console.log(err);
    });