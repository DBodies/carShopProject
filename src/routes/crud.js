import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllCarsController } from "../controller/crudCarsController.js";

const router = Router()
router.get('/allCars', ctrlWrapper(getAllCarsController))
export default router