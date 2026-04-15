import { getAllCars, getCarById } from "../services/crudCars.js"
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