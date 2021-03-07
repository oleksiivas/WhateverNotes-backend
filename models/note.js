const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    dateCreated: {
        type: Date,
        required: true
    },

    subject: {
      type: String,
      require: true
    },
    content: {
      type: String,
      required: true
    }
 });

module.exports = mongoose.model('Note', noteSchema);