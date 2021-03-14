path = require('path')
fs = require('fs')

exports.getPage = (req, res, next) => {
    let avengers = getAvengersAsJson();
    
    res.render('../views/pages/page10.ejs', {
        avengers: avengers,
        title: 'Display Avengers',
        path: 'prove10'
    });
};

exports.postAddAvenger = (req, res, next) => {
    avenger = {
        name: req.body.name,
        power: req.body.power
    }

    let avengers = getAvengersAsJson();

    if (avengers.filter(ave => ave.name === avenger.name).length === 0) {
        avengers.push(avenger);
        fs.writeFileSync(getAvengersPath(), JSON.stringify(avengers));
    }

    res.render('../views/pages/page10.ejs', {
        avengers: avengers,
        title: 'Display Avengers',
        path: 'prove10'
    });

};

function getAvengersAsJson() {
    let avengersPath = getAvengersPath();
    return JSON.parse(fs.readFileSync(avengersPath).toString());
}

function getAvengersPath() {
    return path.join(__dirname, "..", "data", "avengers.json");
}