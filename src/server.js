import express from 'express'
import { getEnvVar } from './middlewares/getEnvVar.js'
import router from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'

export const startServer = () => {
const app = express()
app.use(express.json())
const PORT = Number(getEnvVar("PORT", "4330"))
app.get('/car', (req,res) => {
    res.send('Hello world')
})
app.use(router)
app.use(errorHandler)
app.listen(PORT, () =>{
    console.log(`Server has already started on port ${PORT}`)
})
}