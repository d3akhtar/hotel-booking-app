import express,{Request,Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async(req: Request, res: Response) => {
    try{
        let user = await User.findOne(({
            email: req.body.email
        }))
        if (user){
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }
        user = new User(req.body);
        await user.save();
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        })

        res.cookie("auth_token", token, {
            httpOnly: true, // this means the cookie can only be accessed on the server
            secure: process.env.NODE_ENV === "production", // only accept cookies over https, def want this in production
            maxAge: 86400000
        });
        return res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default router;