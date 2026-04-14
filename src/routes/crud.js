import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllCarsController, getCarByIdController } from "../controller/crudCarsController.js";

const router = Router()
router.get('/allCars', ctrlWrapper(getAllCarsController))
router.get('/:carId', ctrlWrapper(getCarByIdController))
export default router