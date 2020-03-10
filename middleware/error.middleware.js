function errorHandler(err,req,res,next){
    //check error and return response
    if(err.name == "UnauthorizedError")
        return res.status(401).json({message : "Username or password incorrect" });
    else if(err.name == "Not Allowed")
        return res.status(401).json({message : err.message });
    else    
        return res.status(500).json({message : err.message });
}

module.exports = errorHandler;