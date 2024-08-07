import express,{Request,Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/login", 
    [
        check("email", "Email is required").isString(),
        check("password", "Password with 6 or more characters is required").isLength({min: 6})
    ],
    async(req: Request, res: Response) => {
        const errors = validationResult(res);
        if (!errors.isEmpty()){
            return res.status(400).json({message: errors.array()});
        }

        const {email,password} = req.body;

        try{
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({
                    message: "Invalid credentials"
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({
                    message: "Invalid credentials" // good to be generic to not give any clues
                })
            }
            else{
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
                res.status(200).json({userId: user._id}) // send an id for convenience purposes
            }
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Something went wrong"
            })
        }
    })

router.get("/validateToken", verifyToken /* This is where middleware goes */, (req: Request, res:Response) => {
    res.status(200).send({userId: req.userId})
})

router.post("/sign-out", async (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0), // creates a new token with the expiration date set at the time of creation, so expired right away
    });
    res.sendStatus(200)
})

export default router;