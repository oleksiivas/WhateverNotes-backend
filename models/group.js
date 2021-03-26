const mongoose = require('mongoose');
const note = require('./note').noteSchema;

const Schema = mongoose.Schema;

const groupSchema = new Schema({

  notes: [{
    noteId: {
      type: Schema.Types.ObjectId,
      ref: 'Note',
      required: true
    }
  }],

  users: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }

  }]
});

module.exports = mongoose.model('Group', groupSchema);