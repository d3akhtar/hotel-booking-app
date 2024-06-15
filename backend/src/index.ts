import express, {Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(express.json()) // Converts body into json automatically
app.use(express.urlencoded({extended:true})) // Helps parse url to get query params
app.use(cors())

app.get("/api/test", async (req : Request,res : Response) => {
    res.send({message: "nice"});
})

app.listen(5000, () => {
    console.log("Listening on port 5000");
})