const Note = require('../models/note');

exports.getNotes = () => {};

exports.getAddNote = () => {};

exports.postAddNote = (req, res, next) => {
    console.log('In postAddNote!!!');
    const dateCreated = Date.now();
    const subject = "Hello";
    const content = "Great content";
    const note = new Note({
        dateCreated: dateCreated,
        subject: subject,
        content: content
    });
    note.save()
        .then(result => {
            console.log('Created Note');
            res.status(201).send({response: "Created a note"})
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditNote = () => {};

exports.putEditNote = () => {};

exports.postDeleteNote = () => {};