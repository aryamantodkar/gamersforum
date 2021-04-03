const jwt = require ('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.headers['authtoken'];
    if(!token) return res.status(401).send('Please Login First')
    try{
        const verified = jwt.verify(token,process.env.TOKEN);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}