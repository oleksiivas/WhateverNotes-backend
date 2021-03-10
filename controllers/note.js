const Note = require('../models/note');

exports.getNotes = () => {};

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
            // how to ddifrenciate between 404, server errors and more?
            res.status(500).send({
                response: "Couldn't get the note"
            });
        })
};

exports.postCreateNote = (req, res, next) => {
    const dateCreated = Date.now();
    const subject = req.body.subject || "default subject"; // Ask Andrew how to deal with undefined values.
    const content = req.body.content || "default content";
    const note = new Note({
        dateCreated: dateCreated,
        subject: subject,
        content: content,
    });
    note.save()
        .then(result => {
            res.status(201).send({
                response: "Created a note",
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                Error: err.errors
            });
        });
};

exports.putUpdateNote = (req, res, next) => {
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

exports.deleteDeleteNote = (req, res, next) => {
    const noteId = req.body.noteId;

    Note.findByIdAndRemove(noteId) // WHat's the difference between delete and remove
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