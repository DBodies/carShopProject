import createHttpError from "http-errors"
import { carsCollection } from "../collections/carsCollection.js"
import { calculatePaginationParams } from "../utils/parsePagination.js"
import { SORT_VALUE } from "../constant/index.js"
import {filters} from '../utils/filtersObject.js'

export const getAllCars = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_VALUE.ASC,
    sortBy = "_id",
    filter = {}
}) => {
    const limit = perPage
    const skip = (page - 1) * perPage
    const carQuery = carsCollection.find()
    filters(carQuery,filter)
    const [total, car] = await Promise.all([
        carQuery.clone().countDocuments(),
        carQuery.clone().skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec()
    ])

    const paginationParams = calculatePaginationParams(total, page, perPage)
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

