import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import { Response, Request, NextFunction, Express } from "express";
import config from "../../config";

declare global {
    namespace Express{
        interface Request {
            user:Object|number
        }
    }
}

const tokenAuthentication = (req:Request, res:Response, next:NextFunction)=>{
    const {auth} = req.cookies;
    const routes = req.route
    if ((!auth &&(routes.path === '/history' || routes.path === '/history/order/:id'))) {
        return res.redirect('/login')
    }
    // console.log(auth
    if(auth){
        const tokenValidated = jwt.verify(auth, config.SECRET as Secret) as JwtPayload;
        req.user = tokenValidated.user
        return next();
    }
    req.user = {id: 0};
    next();
}

export default tokenAuthentication

