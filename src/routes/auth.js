import { Router } from "express";
import { validationHandler } from "../middlewares/validationHandler.js";
import { createUserSchema } from "../schemas/usersSchema.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController } from "../controller/authController.js";

const router = Router()
router.post('/registration', validationHandler(createUserSchema),
ctrlWrapper(registerUserController)
)

export default router