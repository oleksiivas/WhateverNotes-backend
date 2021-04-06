const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 5500

const app = express();

const groupRoutes = require('./routes/group');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');
const chatRoutes = require('./routes/chat');

app.use(cors())

app.use(bodyParser.json({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))
    .use('/groups', groupRoutes)
    .use('/auth', authRoutes)
    .use('/note', noteRoutes)
    .use('/chat', chatRoutes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res, next) => {
        res.render('pages/app', {
            title: 'Whatever Notes',
            path: '/'
        });
    });

chatHistory = []

mongoose.connect(process.env.DATABASE_URL)
    .then(result => {
        server = app.listen(PORT);
        console.log(`\nConnected to the database!!! :D
            listening on port ${PORT}.
            URL: localhost:${PORT}`);

        const io = require('socket.io')(server);
        io.on('connection', socket => {
            console.log('Client connected!')
            socket.on('disconnect', () => {
                console.log('Client disconnected!')
            })

            // Listen for add events
            socket.on('addReply', reply => {
                chatHistory.push(reply);
                io.emit('updatedChat', chatHistory);
            })
        })
    })
    .catch(err => {
        console.log(err);
    });