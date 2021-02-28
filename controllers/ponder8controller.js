// const { resolveInclude } = require('ejs');
const fetch = require('node-fetch');
const https = require('https')
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

const items_per_page = 10;

const renderPages = (req, res, json) => {
    let searchedValue =  req.query.searchValue || ''
    let page = req.query.page || 1

    const indexStart = (page - 1) * items_per_page
    const indexEnd = page * items_per_page

    console.log(global.parsedJson)
    const filteredData = global.parsedJson.filter(x => x.name.toLowerCase().includes(searchedValue.toLowerCase()))
    console.log(filteredData)

    // const filteredData = req.query.items.filter(x =>
    //     x.name.toLowerCase().includes(searchedValue.toLowerCase())
    // )
    // console.log(filteredData)

    let result = {
        items: filteredData.slice(indexStart, indexEnd),
        path: '/ponder8',
        title: 'Ponder 8 From Controller',
        searchedValue: searchedValue,
        page: page,
        numPages: Math.ceil(filteredData.length / items_per_page)
    }

    res.render('pages/json', result)
}


exports.getJson = (req, res, next) => {
    
    https
        .get(url, function (response) {
            var body = ''

            response.on('data', function (chunk) {
                body += chunk
            })

            response.on('end', function () {
                global.parsedJson = JSON.parse(body)
                // Simplifying W03 rendering...
                renderPages(req, res, global.parsedJson)
            })
        })
        .on('error', function (e) {
            console.log('Got an error: ', e)
        })
};

exports.getIndex = (req, res, next) => {

    this.renderPages(req, res, global.parsedJson)
};