const jwt = require('jsonwebtoken');


// verify jwt token
// middleware
const verifyToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message : "unauthorized access"});
    }
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
        if(err){
            return res.status(401).send({message:"Token is invalid"});
        }
        req.decode = decode;
        next();
    })
    
}

module.exports = verifyToken;