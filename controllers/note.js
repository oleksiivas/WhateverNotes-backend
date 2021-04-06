const Note = require('../models/note');
const User = require('../models/user');

exports.getNotes = (req, res, next) => { 
    User.findById(req.userId)
        .then(user => {
            if (!user) {
                res.status(404).send({
                    response: "user not found"
                });
            }
            Note.find({
                '_id': { $in: user.notes}
            })
            .then(notes => {
                res.status(200).send({response:"Here are the notes", data: notes})
            })
            .catch(err => {
                res.status(500).send({
                    response: "There was a problem while getting the notes"
                });
            }) 
        })
        .catch(err => {
            res.status(500).send({
                response: "There was a problem while getting the note"
            });
        })
};

exports.getNote = (req, res, next) => {
    const noteId = req.params.noteId;

    Note.findById(noteId)
        .then(note => {
            if (!note) {
                res.status(404).send({
                    response: "Note not found"
                });
            }
            res.status(200).send({
                response: note
            });
        })
        .catch(err => {
            res.status(500).send({
                response: "There was a problem while getting the note"
            });
        })
};

exports.postCreateNote = (req, res, next) => {
    if (req.body.subject === "" || req.body.content === "") {
        res.status(400).send({response: "Subject and content cannot be empty"})
    }
    const dateCreated = Date.now();
    const subject = req.body.subject;
    const content = req.body.content;
    const note = new Note({
        dateCreated: dateCreated,
        subject: subject,
        content: content,
    });

    User.findById(req.userId)
        .then(user => {
            note.save()
            .then(savedNote => {
                console.log(`Creating a note for user ${user}`);
                user.notes.push(savedNote._id);
                user.save()
                    .then(result => {
                        res.status(201).send({
                            response: "Created a note",
                            data: savedNote
                        });
                    })
                    .catch(err => {
                        console.log(err);
                         res.status(500).send({
                             Error: err.errors
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    Error: err.errors
                });
            });

            })
        .catch(err => {
            res.status(500).send({
                response: "There was a problem while getting the User for creating a note"
            });
        })
    
};

exports.putUpdateNote = (req, res, next) => {
    if (req.body.subject === "" || req.body.content === "") {
        res.status(400).send({response: "Subject and content cannot be empty"})
    }
    const noteId = req.body.noteId;
    const updatedSubject = req.body.subject;
    const updatedContent = req.body.content;

    Note.findById(noteId)
        .then(note => {
            if (!note) {
                res.status(404).send({
                    response: "Note not found"
                });
            }
            note.subject = updatedSubject;
            note.content = updatedContent;
            note.save()
                .then(result => {
                    res.status(200).send({
                        response: "Successfully updated the note",
                        data: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: "Couldn't save the note to be updated"
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: "There was a problem while finding a note to be updated"
            });
        });
};

exports.deleteNote = (req, res, next) => {
    const noteId = req.body.noteId;

    Note.findByIdAndRemove(noteId)
        .then(() => {
            res.status(200).send({
                response: "Deleted the note"
            })
        })
        .catch(err => {
            res.status(500).send({
                response: "Couldn't delete the note"
            })
        })
};