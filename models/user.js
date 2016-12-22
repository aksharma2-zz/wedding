var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/guests');

var db=mongoose.connection;

//Define user schema

var UserSchema = mongoose.Schema({
    fname:{
        type:String
    },

    lname:{
        type:String
    },
    email:{
        type:String
    },

    msg:{
        type:String
    }
});

var User=module.exports=mongoose.model('User',UserSchema);

module.exports.createUser=function(newUser, callback){
            newUser.save(callback);
        
}