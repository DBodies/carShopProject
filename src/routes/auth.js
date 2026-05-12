import { Router } from "express";
import { validationHandler } from "../middlewares/validationHandler.js";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchema.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { googleOAuthController, loginUserController, loginWithGoogleController, logoutUserController, refreshSessionController, registerUserController, requestResetEmailController, resetPasswordController } from "../controller/authController.js";
import { requestResetEmailSchema, resetPweSchema } from "../schemas/requestResetEmail.js";
import { loginWithGoogleAuthSchema } from "../schemas/loginWithGoogleAuthSchema.js";

const router = Router()
router.post('/registration', validationHandler(createUserSchema),
ctrlWrapper(registerUserController)
)
router.post('/login', validationHandler(loginUserSchema),
    ctrlWrapper(loginUserController))
router.post('/logout', ctrlWrapper(logoutUserController))
router.post('/refresh', ctrlWrapper(refreshSessionController))
router.post('/requestResetEmail', validationHandler(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController))
router.post('/reset-password', validationHandler(resetPweSchema),
    ctrlWrapper(resetPasswordController))
router.get('/get-oauth-url', ctrlWrapper(googleOAuthController))
router.post('/confirm-auth',
    validationHandler(loginWithGoogleAuthSchema),
    ctrlWrapper(loginWithGoogleController))
export default router