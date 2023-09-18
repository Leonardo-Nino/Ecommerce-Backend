import { Router } from 'express'



const errorsRouter = Router()


errorsRouter.get('/errorLog', (req, res) => {
    res.render('errorLogin_Logout_NewPass')
})


export default errorsRouter