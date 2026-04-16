import mongoose, { Schema } from "mongoose";

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