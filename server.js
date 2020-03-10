var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userService = require('./controller/user.controller.js');
var jwt = require('./middleware/jwt.middleware.js');
var errorHandler = require('./middleware/error.middleware');

app.use(bodyParser.json());
app.use(jwt());

app.use('/',userService);
app.use(errorHandler);


app.listen(3000,function(){
    console.info('Server started');
})