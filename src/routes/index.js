import { Router } from 'express'
import authRoutes from './auth.js'
import crudRoutes from './crud.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/cars', crudRoutes)

export default router