const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 5500

const app = express();
const ponder8Routes = require('./routes/ponder08');

app.use(express.static(path.join(__dirname, 'public')))
    .use('/ponder8', ponder8Routes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res, next) => 
    {
        res.render('pages/app', {title: 'Whatever Notes', path: '/'});
    })
    .listen(PORT, () => console.log(`listening on ${ PORT }`))