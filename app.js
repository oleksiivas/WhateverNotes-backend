const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 5500

const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const ponder8Routes = require('./routes/ponder08');
const adminRoutes = require('./routes/admin');

app.use(express.static(path.join(__dirname, 'public')))
    .use('/ponder8', ponder8Routes)
    .use('/database', adminRoutes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res, next) => {
        res.render('pages/app', {
            title: 'Whatever Notes',
            path: '/'
        });
    });

mongoConnect(() => {
    app.listen(PORT, () => console.log(`listening on ${ PORT }`));
});