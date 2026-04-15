import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { deleteCarByIdController, getAllCarsController, getCarByIdController, patchCarController, upsertedCarController } from "../controller/crudCarsController.js";
import { validationHandler } from "../middlewares/validationHandler.js";
import { carPatchSchema, createCarSchema } from "../schemas/upsertCar.js";

const router = Router()
router.get('/allCars', ctrlWrapper(getAllCarsController))
router.get('/:carId', ctrlWrapper(getCarByIdController))
router.post('/:carId', 
    validationHandler(createCarSchema),
    ctrlWrapper(upsertedCarController))
router.patch('/:carId', 
        validationHandler(carPatchSchema),
        ctrlWrapper(patchCarController)
    )
router.delete('/:carId', ctrlWrapper(deleteCarByIdController))
export default router