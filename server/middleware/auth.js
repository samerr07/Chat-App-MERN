const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req,res,next)=>{
    try{
        const token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"User not authenticated"
            })
        }

        //verify the token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // req.user = decoded.userId;
        req.id = decoded.userId;
        next()
    }catch(err){
        console.log(err)
    }
}