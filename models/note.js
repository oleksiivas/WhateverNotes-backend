const mongoConnect = require('../util/database').mongoConnect;
const getDB = require('../util/database').getDB;

class Note {
    constructor(title, author, size) {
        this.title = title;
        this.author = author;
        this.size = size;
    }

    save() {
        const db = getDB();
        db.collection('notes').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

}