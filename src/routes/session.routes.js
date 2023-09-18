import { Router } from 'express'
import { login, logout, current } from '../controllers/session.controller.js'
import passport from 'passport'

const sessionRouter = Router()

// ruta para  login

sessionRouter.get('/login', async (req, res) => {
  res.render('login')
})

sessionRouter.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureMessage: 'Something went wrong',
    failureRedirect: '/api/errors/errorLog'
  }),
  login
)

// ruta logout

sessionRouter.get('/logout', logout)


sessionRouter.get('/current', current);

export default sessionRouter
