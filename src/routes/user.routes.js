import { Router } from 'express'
import { changeUserRole, deleteOneUser } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/primium/:uid', changeUserRole)

userRouter.post('/deleteone/:uid', deleteOneUser)
export default userRouter
