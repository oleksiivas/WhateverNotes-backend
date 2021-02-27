const fetch = require('node-fetch');
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";


exports.getJson = (req, res, next) => {
    fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        res.render('pages/json', {
            items: jsObject,
            title: 'Ponder 8',
            path: '/ponder8'
        });
    });
};