import bcrypt from "bcryptjs";
import mongoose, {Document} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        default: false,
        required: true,
        type: Boolean,
    },
}, {
    timestamps: true,
});

export interface UserInterface {
    name: string
    email: string
    password: string
    isAdmin: boolean
}

export interface UserDocument extends UserInterface, Document {
    matchPassword(enteredPassword: string): boolean
}

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
