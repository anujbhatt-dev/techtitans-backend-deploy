const mongoose = require('mongoose');
const validator = require("validator")
const moment = require('moment-timezone');
const SuggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invali email")
      }
    }
  },
  description: {
    type: String,
    required: true,
    minLength:50
  }
},{
  timestamps:{
    currentTime: () => Math.floor(Date.now() + 5.5 * 60 * 60 * 1000)
  }
});

const Suggestion = mongoose.model('Suggestion', SuggestionSchema);

module.exports = Suggestion;
