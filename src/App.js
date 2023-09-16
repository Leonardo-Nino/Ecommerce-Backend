import 'dotenv/config'

import express from 'express'
import './config/configDB.js'
import { Server } from 'socket.io'
import methodOverride from 'method-override';

import adminRouter from './routes/admin.routes.js'
import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import messagesRouters from './routes/messages.routes.js'
import sessionRouters from './routes/session.routes.js'
import registerRouter from './routes/register.routes.js'
import loggerRoutes from './routes/loggerTest.routes.js'
import resetPasswordsRouter from './routes/resetPasswor.routes.js'
import userRouter from './routes/user.routes.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passportStrategies.js'

import { engine } from 'express-handlebars'
import { __dirname, __filename } from './utils/path.js'
import * as path from 'path'
import errorHandler from '../src/middleware/errors.js'

import { loggerDev } from './utils/loggerWinston.js'

import { loggerMiddleware } from './middleware/logger.js'

// Configuration express

const app = express()
const port = 4000



// use put delete in Routes

app.use(methodOverride('_method'))

//Swagger configuration

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Ecommerce APIs documentation for CoderHouse proyect',
      description: 'Info product and cart modules',
      version: '1.0.0',
      contact: {
        name: 'Leonardo Niño',
        url: 'https://www.linkedin.com/in/leonardo-nino',
        email: 'leonardoninio@gmail.com',
      },
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
}

const spec = swaggerJSDoc(swaggerOptions)

// Cookies configuration

app.use(cookieParser(process.env.SIGNED_COOKIES))

// session  configuration

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGOOSE,

      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },

      ttl: 3600,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Passport configuration
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Configuration handlebars

app.engine('handlebars', engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

const myServer = app.listen(port, () => {
  loggerDev.info(`Listening on port ${port}`)
})

// server Io

const io = new Server(myServer) // , { cors: { origin: '*' } }

app.use((req, res, next) => {
  req.io = io
  return next()
})

//Configuration routes

app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)
app.use('/api/messages', messagesRouters)
app.use('/api/session', sessionRouters)
app.use('/api/register', registerRouter)
app.use('/api/loggerTest', loggerRoutes)
app.use('/api/resetPass', resetPasswordsRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

app.use(errorHandler)