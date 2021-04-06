const path = require('path');

const router = express.Router();

const noteController = require('../controllers/note');

const isAuth = require('../middleware/is_auth');

// /note/notes => GET
router.get('/notes', isAuth, noteController.getNotes);

// /note/note => GET
router.get('/:noteId', isAuth, noteController.getNote);

// /note/add-note => POST
router.post('/create-note', isAuth, noteController.postCreateNote);

// /note/edit-note => PUT
router.put('/update-note', isAuth, noteController.putUpdateNote);

// /note/delete-note => DELETE
router.delete('/delete-note',isAuth, noteController.deleteNote);

module.exports = router;