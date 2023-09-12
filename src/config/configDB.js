import 'dotenv/config'
import mongoose from 'mongoose'
import { loggerDev } from '../utils/loggerWinston.js'



//moongoose configuration

mongoose
  .connect(process.env.URL_MONGOOSE)
  .then(() => loggerDev.info('DB is connected'))
  .catch((err) => loggerDev.fatal(err))
