import express, {Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json()) // Converts body into json automatically
app.use(express.urlencoded({extended:true})) // Helps parse url to get query params
app.use(cors())

app.get("/api/test", async (req, res : Response) => {
    res.json({message: "nice"})
})
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Listening on port 5000");
})