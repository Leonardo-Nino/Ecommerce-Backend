import { Router } from 'express'


import { changeUserRole } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/primium/:uid', changeUserRole)


export default userRouter
