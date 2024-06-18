import express, {Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";

import cookieParser from "cookie-parser";
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cookieParser());
app.use(express.json()) // Converts body into json automatically
app.use(express.urlencoded({extended:true})) // Helps parse url to get query params
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.static(path.join(__dirname, "../../frontend/dist"))) // go to the frontend dist folder and serve those static assets on the root of the url the backend runs on

app.get("/api/test", async (req, res : Response) => {
    res.json({message: "nice"})
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("api/my-hotel", myHotelRoutes);

app.listen(5000, () => {
    console.log("Listening on port 5000");
})