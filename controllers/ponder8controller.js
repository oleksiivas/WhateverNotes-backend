// const { resolveInclude } = require('ejs');
const fetch = require('node-fetch');
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

const items_per_page = 10;

const renderPages = (req, res, json) => {
    let startingItem = req.body.searchItem || req.query.searchItem || ''
    let page = req.quety.page || 1

    const indexStart = (page - 1) * items_per_page
    const indexEnd = page * (items_per_page - 1)

    const filteredData = global.parsedJson.filter(x => x.name.toLowerCase().includes(startingItem.toLowerCase()))

    let result = {
        data: filteredData.slice(indexStart, indexEnd),
        path: '/prove08',
        title: 'Ponder 8',
        startingItem: startingItem,
        page: page,
        numPages: Math.ceil(filteredData.length / items_per_page)
    }

    res.render('', result)
}


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