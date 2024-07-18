// using "my" in the name since this is the endpoint that lets users create, update, and view their own hotels

import express, {NextFunction,Request,Response} from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 // 5MB, do it like this for developer friendliness 
    }
})

router.post("/", verifyToken, 
[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
], upload.array("imageFiles", 6),
async (req: Request, res: Response) => {
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // 1. upload images to cloudinary
        
        const uploadPromises = imageFiles.map(async(image) => {
            // save image as a 64 bit string
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })
        
        const imageUrls = await Promise.all(uploadPromises)

        // 2. if success, add URLS to the new hotel

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // 3. save the new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        // 4. return 201 status
        res.status(201).send(hotel);
    }
    catch(e){
        console.log("Error creating hotel: " + e);
        return res.status(500).json({message: "Something went wrong"});
    }
})

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try{
        const hotels = await Hotel.find({userId: req.userId})
        res.status(200).json(hotels)
    }
    catch (e){
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.get("/:id", verifyToken, async (req: Request, res:Response) => {
    try{
        const id = req.params.id;
        const hotel : HotelType | null = await Hotel.findById(id);
        if (hotel){
            return res.status(200).send(hotel);
        }
        else{
            return res.status(404).json({
                message: "Hotel with id: " + id + " not found"
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.put("/:id", verifyToken, 
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
        body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
    ], upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;
            newHotel._id = id;
    
            // 1. upload images to cloudinary
            
            const uploadPromises = imageFiles.map(async(image) => {
                // save image as a 64 bit string
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            })
            
            const imageUrls = await Promise.all(uploadPromises)
    
            // 2. if success, add URLS to the new hotel
    
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;
    
            // 3. update the hotel in our database
            const hotel = await Hotel.updateOne(newHotel)
    
            // 4. return 201 status
            res.status(200).send(hotel);
        }
        catch(e){
            console.log("Error creating hotel: " + e);
            return res.status(500).json({message: "Something went wrong"});
        }
    })

export default router;