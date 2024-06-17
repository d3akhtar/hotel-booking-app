"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.check)("email", "Email is required").isString(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters is required").isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(res);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials" // good to be generic to not give any clues
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d"
            });
            res.cookie("auth_token", token, {
                httpOnly: true, // this means the cookie can only be accessed on the server
                secure: process.env.NODE_ENV === "production", // only accept cookies over https, def want this in production
                maxAge: 86400000
            });
            res.status(200).json({ userId: user._id }); // send an id for convenience purposes
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}));
router.get("/validateToken", auth_1.default /* This is where middleware goes */, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post("/sign-out", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("auth_token", "", {
        expires: new Date(0), // creates a new token with the expiration date set at the time of creation, so expired right away
    });
    res.sendStatus(200);
}));
exports.default = router;
