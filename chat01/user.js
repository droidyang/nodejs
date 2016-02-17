var express = require('express'),  
    config  = require('./config'),
    jwt     = require('jsonwebtoken'),
    bodyParser =require('body-parser');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'user1',
  password: 'password'
}];

function createToken(user) {
  return jwt.sign({userid:user.id}, config.secret, { expiresInMin: '1h' } );
}

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post('/login', function(req, res) {

   console.log(JSON.stringify(req.body));

  var user = users[0];
  
  if (user.username !== req.body.username) {
    return res.status(401).send({message:"The username or password don't match", user: user});
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  var resContent={
	 token: createToken(user) 
  };
  
  res.status(200).json(resContent);
});