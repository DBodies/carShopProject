import express from 'express'
import { getEnvVar } from './middlewares/getEnvVar.js'
import router from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import { routeNotFound } from './middlewares/routeNotFound.js'
import { swaggerDocs } from './middlewares/swaggerDocs.js'

export const startServer = () => {
const app = express()
app.use(cookieParser())
app.use(express.json())
const PORT = Number(getEnvVar("PORT", "4330"))
app.get('/car', (req,res) => {
    res.send('Hello world')
})
    app.use(router)
    app.use('/api-docs', swaggerDocs())
app.use(routeNotFound)
app.use(errorHandler)
app.listen(PORT, () =>{
    console.log(`Server has already started on port ${PORT}`)
})
}