import { ONE_DAY } from "../constant/index.js"
import { loginUser, registerUser } from "../services/auth.js"

export const registerUserController = async (req,res) => {
    const result = await registerUser(req.body)
    res.status(200).json({
        message: 'User created',
        data: {
            id: result._id,
            name: result.name,
            email: result.email
        }
    })
}
