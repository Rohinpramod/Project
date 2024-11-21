const jwt = require('jsonwebtoken');

exports.generateToken = (user,role)=>{
    try{
        var token = jwt.sign({id:user._id, role:role},process.env.JWT_SECRET);
        return token
    }catch(error){
        console.log(error)
    }
}
