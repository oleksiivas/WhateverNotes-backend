const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/group');
const isAuth = require('../middleware/is_auth');


// Show groups
router.get('/groups', isAuth, controller.getAllGroups);

// Show a specific group
router.get('/:groupId', isAuth, controller.getGroup);

// Create a new group 
router.post('/create-group', isAuth, controller.postGroup);

// Edit a chosen group
router.put('/edit-group', isAuth, controller.putGroup);

// delete the group
router.delete('/delete-group', isAuth, controller.deleteGroup);

module.exports = router;