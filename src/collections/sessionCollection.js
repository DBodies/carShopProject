import mongoose, { Schema } from "mongoose";


const sessionSchema = new Schema({
    userId: {type :Schema.Types.ObjectId, ref: 'Users'},
    accessToken: {type: String, required: true},
    accessTokenValidUntil: {type: Date, required: true},
    refreshToken: {type: String, required: true},
    refreshTokenValidUntil: {type: Date, required: true}
})
export const sessionCollection = mongoose.model('sessionCollection', sessionSchema)
