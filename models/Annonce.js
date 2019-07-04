const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  avatar: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type:String,
    reguired: true
  },
  price: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  etat: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Annonce = mongoose.model('annonce', PostSchema);
