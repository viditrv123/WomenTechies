var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var userSchema = new Schema({
    username:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    
    password:{
        type: String,
        required: true
    },
    role:{
        type:Number,
        default: 0
    }
  },{
      timestamps:true
  });


  module.exports=mongoose.model("User",userSchema);