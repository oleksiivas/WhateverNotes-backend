const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    date: {
      type: Date,
      required: true
    },

    subject: {
        type: String,
        require: true

    },

    noteId:{
//I don't quite sure what to put here. 
    }, 
content:{
type: String,
required: true
}

});

module.exports = mongoose.model('Note', noteSchema);
