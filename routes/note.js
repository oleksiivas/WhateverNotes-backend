const path = require('path');
const express = require('express');

const router = express.Router();

const noteController = require('../controllers/note');

// /note/notes => GET
router.get('/notes', noteController.getNotes);

// /note/note => GET
router.get('/:noteId', noteController.getNote);

// /note/add-note => POST
router.post('/create-note', noteController.postCreateNote);

// /note/edit-note => PUT
router.put('/update-note', noteController.putUpdateNote);

// /note/delete-note => DELETE
router.delete('/delete-note', noteController.deleteNote);

module.exports = router;