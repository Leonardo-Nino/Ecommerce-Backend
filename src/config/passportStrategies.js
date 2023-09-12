import 'dotenv/config'
import passport from 'passport'
import { validatePassword } from '../utils/bcrypt.js'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as LocalStrategy } from 'passport-local'
import { userModel } from '../DAL/mongoDB/models/user.js'

const initializePassport = () => {
  //local strategy
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await userModel.findOne({ email })
          if (!user) {
            return done(null, false)
          }
          const isPasswordValid = await validatePassword(
            password,
            user.password
          )
          if (!isPasswordValid) {
            return done(null, false)
          }
          done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  //github

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.e4149f39af2a233b',
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://localhost:4000/api/register/githubcallback',
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          //console.log(profile)
          const user = await userModel.findOne({ email: profile._json.email })
          if (!user) {
            const newUser = new userModel({
              first_name: profile._json.name.split(' ')[0],
              last_name: profile._json.name.split(' ')[1] ?? ' ',
              age: 0,
              email: profile._json.email,
              password: ' ',
              method: 'github',
            })
            const newUserDB = await userModel.create(newUser)

            return done(null, newUserDB)
          } else {
            return done(null, user)
          }
        } catch (error) {
          return done('error trying to login with GitHub ', +error)
        }
      }
    )
  )
  // Para inicial session

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

export default initializePassport
