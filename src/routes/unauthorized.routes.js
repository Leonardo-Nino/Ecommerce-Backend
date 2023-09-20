import { Router } from 'express'
const unauthorizedRouter = Router()

unauthorizedRouter.get('/', (req, res) => {
    res.render('unauthorized')
})


export default unauthorizedRouter