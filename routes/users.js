var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var User=require('../models/user');
//var flash = require('express-flash');
var bodyParser = require('body-parser');

// middleware
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/rsvp', function(req, res, next) {
  res.render('rsvp');
  console.log("hi");
});

router.post('/rsvp', function(req, res, next) {  
  var fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;
  var msg=req.body.msg;

  //Validation
  req.check('fname', 'First Name is required').notEmpty();
  req.check('lname', 'Last Name is required').notEmpty();
  req.check('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();

  var errors = req.validationErrors();
  if(errors){
    console.log("Errors");
      console.log(errors);
    res.render('rsvp', { errors:errors });

  
  } else{

	    var newUser = new User({
	        fname:fname,
	        lname:lname,
	        email:email,
	        msg:msg
	    });

	    User.createUser(newUser, function(err,user){
	      if(err) throw err;
	          console.log(newUser);
	    });
	    res.render('rsvp', {success : ' Thank you for RSVP '});
	}
});
module.exports = router;

