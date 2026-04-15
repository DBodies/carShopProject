import createHttpError from "http-errors"
import { deleteCarById, getAllCars, getCarById, upsertedCar } from "../services/crudCars.js"
import { parseFilterParams } from "../utils/parsePagination.js"
import { parsedFiltersParams } from "../utils/parseParams.js"
import { parseSortParams } from "../utils/parseSortParams.js"

export const getAllCarsController = async (req,res) => {
    const {page, perPage} = parseFilterParams(req.query)
    const {sortOrder, sortBy} = parseSortParams(req.query)
    const filter = parsedFiltersParams(req.query)
    const response = await getAllCars({
        page,
        perPage,
        sortOrder,
        sortBy,
        filter
    })
    res.status(200).json({
        message: "successfully getting all cars",
        data: response
    })
}
export const getCarByIdController = async (req,res) => {
    const {carId} = req.params
    const response = await getCarById(carId)
    res.status(200).json({
        message: `successfully getting an car by id ${carId}`,
        data: response
    })
}
export const deleteCarByIdController = async (req,res) => {
    const {carId} = (req.params)
    const result = await  deleteCarById(carId)
    res.status(204).json({
        data: result
    })
}
export const upsertedCarController = async (req,res,next) => {
    const {carId} = req.params
    if(!carId) {
    next(createHttpError(400, `car with id ${carId} was not found`))
    return
    }
    const result = await upsertedCar(carId, req.body, {upsert: true})
    const status = result.isNew ? 201 : 200
    res.status(status).json({
        message: "Successfully upserted an item",
        data: result
    })
}
export const patchCarController = async (req,res,next) => {
    const {carId} = req.params
    if(!carId) {
    next(createHttpError(404, `car with id ${carId} was not found`))
    return 
    }
    const result = await upsertedCar(carId, req.body)
    res.status(200).json({
        message: `Car with ID ${carId} was updated`,
        data: result
    })
}