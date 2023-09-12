import { Router } from 'express'
import { newUser } from '../controllers/register.controller.js'
import passport from 'passport'

const registerRouter = Router()

// ruta para registrar users

registerRouter.get('/', async (req, res) => {
  res.render('register')
})

registerRouter.post('/', newUser)

//Github

registerRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

registerRouter.get(
  '/githubcallback',
  passport.authenticate('github', {
    failureRedirect: '/api/session/login',
  }),
  async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/products')
  }
)

export default registerRouter
