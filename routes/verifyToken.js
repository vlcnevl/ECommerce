const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JwtSecretKey, (err, user) => {
      if (err) return res.status(403).json("Token doğrulaması başarısız!"); // expire or wrong

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Kimlik doğrulaması başarısız!");
  }
};

const verifyTokenAndAuthorization = (req,res,next)=>{
     verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }
        else{
            res.status(403).json("Bu işlemi gerçekleştirmek için yetkili değilsiniz.")
        }
     })
}

const verifyTokenAndAdmin = (req,res,next)=>{
  verifyToken(req,res,()=>{
     if(req.user.isAdmin)
     {
         next();
     }
     else{
         res.status(403).json("Bu işlemi gerçekleştirmek için yetkili değilsiniz.")
     }
  })

}



module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};