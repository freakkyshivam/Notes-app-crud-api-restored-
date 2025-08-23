import jwt from 'jsonwebtoken'

const secretKey = 'shivamKey'
 
const verifyToken = (req,res,next) =>{
    // console.log("Headers received:", req.headers);
    const authHeader = req.headers['authorization'];
    // console.log("Authheader ",authHeader);
    
     if (!authHeader) {
      return res.status(403).json({ error: "No token provided" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Invalid token format" });
    }

const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
   
    // console.log("Token " , token);
    if(!token){
        if(!token){
        return res.status(403).json({error: "NO token"})
    }
}
    jwt.verify(token, secretKey, (err, decoded)=>{
         if(err){
            return res.status(401).json({error: "Invalid token"})
        }
        req.user = decoded;
        return next()
    })

}
    export default verifyToken;
