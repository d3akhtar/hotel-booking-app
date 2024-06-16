import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// defined this so we can use intellisense
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
});

// before we actually save, hash the password, do this here to make the users.ts file in routes folder cleaner
userSchema.pre("save", async function(next) {
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password!, 8)
    }
    next(); // mongo just does the next thing it was going to do
})

const User = mongoose.model<UserType>("User", userSchema);

export default User;