import mongoose, { Schema } from "mongoose";
import { ROLES } from "../constant/index.js";
const userSchema = new Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: [ROLES.admin, ROLES.user],
        default: ROLES.user
    }
},
{ 
    timestamps:true,
    versionKey:false
})

userSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

export const userCollection = mongoose.model('Users', userSchema, 'Users')