import { carsCollection } from "../collections/carsCollection.js"

export const getAllCars = async () => {
    const car = await carsCollection.find()
    return car
}