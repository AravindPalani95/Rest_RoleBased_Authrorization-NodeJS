const jwtToken = require('jsonwebtoken');
const secretConfigJson = require('../config/jwt.secret.json');
const roles = require('../config/role.config.json');

function authorizeApi(req,res,next){
    let token = req.header('authorization');
    if(token.startsWith('Bearer'))
        token = token.substring(7,token.length); // 7 is the Bearer length

    try{
        let decodedToken = jwtToken.verify(token,secretConfigJson.secretKey);
        let authorizedRole = roles.find( el => el.url == req.url);
        console.info(authorizedRole);
        if(authorizedRole.role.includes(decodedToken.role)){
            next();
        }
        else{
            let error = new Error("Access Denied");
            error.name = "Not Allowed"
            next(error);
        }
    }
    catch(ex)
    {
        next(new Error("Invalid Token"));
    }
}

module.exports = authorizeApi;