import { Router } from 'express'
import { generatelink, newPass, checkLink } from '../controllers/resetPass.controller.js'

const resetPasswordsRouter = Router()


resetPasswordsRouter.get('/sendLink', async (req, res) => {
    res.render('sendNewPassLink')
})

resetPasswordsRouter.post('/sendLink', generatelink)

resetPasswordsRouter.get('/newPassword/:token', checkLink)

resetPasswordsRouter.post('/newPassword', newPass)

export default resetPasswordsRouter
