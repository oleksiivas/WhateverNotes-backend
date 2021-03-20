const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/groupsController');


// Show groups
router.get('/groups', controller.getAllGroups);

// Show a specific group
router.get('/groups:groupId', controller.getGroup);

// Create a new group 
router.post('/create-group', controller.postGroup);

// Edit a chosen group
router.put('/edit-group', controller.putGroup);

// delete the group
router.delete('/delete-group', controller.deleteGroup);

module.exports = router;