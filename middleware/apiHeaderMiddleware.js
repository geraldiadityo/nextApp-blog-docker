import { createRouter } from "next-connect";
import jwt from 'jsonwebtoken';
import { getCookie } from "cookies-next";
const JWT_KEY = process.env.JWT_SECRET_KEY;

const apiHeaderMiddleware = createRouter();

apiHeaderMiddleware.use(async (req, res, next) => {
    const { headers } = req;
    const currentToken = headers.authorization?.replace('Bearer ',"");
    
    if (!currentToken) {
        return res.status(401).json({ message: 'Tidak Ada Akses' });
    }

    try {
        const decodedToken = jwt.verify(currentToken, JWT_KEY);
        req.tokenData = decodedToken;

        return next();
    } catch(err){
        return res.status(401).json({ message:'wrong token' });
    }
});

export default apiHeaderMiddleware;