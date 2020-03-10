var express = require('express');
var router = express.Router();
var authHelper = require('../helper/auth.helper.js');
var authorizeApi = require('../middleware/authorization.middleware.js');

router.post('/login',authenticateUser);
router.put('/addUser',authorizeApi,addUser);
router.delete('/deleteUser',authorizeApi,deleteUser);

function authenticateUser(req,res,next){
    authHelper.authenticate(req.body)
    .then(token => res.status(200).json(token))
    .catch(err=> next(err));
}

function addUser(req,res,next){
    let user = req.body.user;
    console.info("New User: "+JSON.stringify(user));
    //implement add user custom logic
    res.status(200).json({ mesage : "User added Successfully "});
}

function deleteUser(req,res,next){
    let user = req.body.user;
    console.info("Delete User: "+JSON.stringify(user));
    //implement Delete user custom logic
    res.status(200).json({ mesage : "User Deleted Successfully "});
}

module.exports = router;