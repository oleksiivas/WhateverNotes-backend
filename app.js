const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 5500

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res, next) => 
    {
        res.render('pages/app', {title: 'Whatever Notes', path: '/'});
    })
    .listen(PORT, () => console.log('listening on ${ PORT }'))