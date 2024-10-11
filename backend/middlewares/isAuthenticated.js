import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token= req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Invalid User or Not Authorized",
                success: false
            });
        }
        const decode= await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success: false
            });
        }
        req.id=decode.userId;
        next(); //is everything is good then use next() to move to next route.
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;