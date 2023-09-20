import { Router } from 'express'
import { auth } from '../middleware/auth.js'

import { changeUserRole, deleteOneUser, deleteAllInactiveUsers, updateActiveAllUsers } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/primium/:uid', auth(['admin']), changeUserRole)

userRouter.delete('/deleteone/:uid', auth(['admin']), deleteOneUser)

userRouter.post('/updateAllActiveUsers', auth(['admin']), updateActiveAllUsers)

userRouter.delete('/deleteInactiveUsers', auth(['admin']), deleteAllInactiveUsers)
export default userRouter
