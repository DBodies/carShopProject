import mongoose from "mongoose"
import { getEnvVar } from "../middlewares/getEnvVar.js"
import dotenv from 'dotenv'
dotenv.config()

export const initMongoDB = async () => {
    try {
    const name = getEnvVar("DB_NAME")
    const password = getEnvVar("DB_PASSWORD")
    const url = getEnvVar("DB_URL")
    const folder = getEnvVar("DB_FOLDER")
await mongoose.connect(`mongodb+srv://${name}:${password}@${url}/${folder}?retryWrites=true&w=majority&appName=ForEducation`)
console.log('Mongo connection successfully established!')
    }catch (e) {
        console.log('Error while setting up mongo connection', e);
        throw e
    }

}