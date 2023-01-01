const jwt =require('jsonwebtoken')

const auth = async function(req,res,next){
let token =req.headers['authorization']
if(!token) return res.status(400).send({status:false,msg:'token must be required'})
jwt.verify(token,'vaccination', function(err,decodedToken){
    if(err){
        return res.status(401).send({status:false,msg:err.message})
    }else{
        req.token=decodedToken.Id
    }
    next()
})

}

