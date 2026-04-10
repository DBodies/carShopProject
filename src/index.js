import { initMongoDB } from "./db/initMongoDB.js"
import { startServer } from "./server.js"

const boot = async () => {
    await initMongoDB()
    startServer()
}
boot()