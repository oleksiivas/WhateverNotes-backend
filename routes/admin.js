const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');
const router = require('./ponder08');

// /admin/notes => GET
router.get('/notes', adminController.getNotes);

// /admin/add-note => GET
router.get('/add-note', adminController.getAddNote);

// /admin/edit-note => GET
router.get('/edit-note/:noteId', adminController.getEditNote);

// /admin/add-note => POST
router.post('/add-note', adminController.postAddNote);

// /admin/edit-note => PUT
router.post('/edit-note', adminController.putEditNote);

// /admin/delete-note => DELETE
router.post('/delete-note', adminController.postDeleteNote);

module.exports = router;