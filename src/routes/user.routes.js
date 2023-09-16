import { Router } from 'express'
import { changeUserRole, deleteOneUser, deleteAllInactiveUsers, updateActiveAllUsers } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/primium/:uid', changeUserRole)

userRouter.delete('/deleteone/:uid', deleteOneUser)

userRouter.post('/updateAllActiveUsers', updateActiveAllUsers)

userRouter.delete('/deleteInactiveUsers', deleteAllInactiveUsers)
export default userRouter
