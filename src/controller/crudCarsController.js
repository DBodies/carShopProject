import { getAllCars } from "../services/crudCars.js"

export const getAllCarsController = async (req,res) => {
    const response = await getAllCars()
    res.status(200).json({
        message: "successfully getting all cars",
        data: response
    })
}