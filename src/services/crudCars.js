import createHttpError from "http-errors"
import { carsCollection } from "../collections/carsCollection.js"
import { calculatePaginationParams } from "../utils/parsePagination.js"

export const getAllCars = async ({
    page = 1,
    perPage = 10
}) => {
    const limit = perPage
    const skip = (page - 1) * perPage
    const carQuery = carsCollection.find()
    const carCount = await carsCollection.find().merge(carQuery).countDocuments()
    const car = await carQuery.find().skip(skip).limit(limit).exec()
    const paginationParams = calculatePaginationParams(carCount, page, perPage)
    return {
        data: car,
        ...paginationParams
    }
}
export const getCarById = async (carId) => {
    const car = await carsCollection.findById(carId)
    if(!car) {
        throw createHttpError(404, `car with id ${carId} not found`)
    }
    return car
}