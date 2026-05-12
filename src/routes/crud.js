import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { deleteCarByIdController, getAllCarsController, getCarByIdController, patchCarController, upsertedCarController } from "../controller/crudCarsController.js";
import { validationHandler } from "../middlewares/validationHandler.js";
import { carPatchSchema, createCarSchema } from "../schemas/upsertCar.js";
import { authenticate } from '../middlewares/auth.js'
import { authorization } from "../middlewares/checkRoles.js";
import { ROLES } from "../constant/index.js";
const router = Router()
router.get('/allCars', ctrlWrapper(getAllCarsController))
router.use(authenticate)
router.get('/:carId', authorization(ROLES.user), ctrlWrapper(getCarByIdController))
router.post('/:carId', 
    validationHandler(createCarSchema),
    ctrlWrapper(upsertedCarController))
router.patch('/:carId', 
        validationHandler(carPatchSchema),
        ctrlWrapper(patchCarController)
    )
router.delete('/:carId', authorization(ROLES.admin),ctrlWrapper(deleteCarByIdController))
export default router