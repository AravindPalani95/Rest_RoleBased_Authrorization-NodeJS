var jwtToken = require('jsonwebtoken');
var users = require('../config/users.config.json');
var jwtSecret = require('../config/jwt.secret.json');

async function authenticate({username,password}){
    let user = users.find(user => user.username === username && user.password === password);
    if(user){
        const token = jwtToken.sign({ id : user.id, name: user.username, role: user.role }, 
             jwtSecret.secretKey); 
        return { "token": token};
    }
    else{
        let error = new Error("UnauthorizedError");
        error.name = "UnauthorizedError"
        throw error;
    }
}

module.exports.authenticate = authenticate;