import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Access token is missing or invalid'})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
        return res.status(403).json({ success: false, message: 'Token has expired' });
        }
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
}