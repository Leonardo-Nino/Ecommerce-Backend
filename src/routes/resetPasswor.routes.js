import { Router } from 'express'
import { generatelink, newPass } from '../controllers/resetPass.controller.js'

const resetPasswordsRouter = Router()

resetPasswordsRouter.get('/sendLink', generatelink)

resetPasswordsRouter.get('/newPassword/:token', newPass)

export default resetPasswordsRouter
