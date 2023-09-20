import { Router } from "express";
import { auth } from '../middleware/auth.js'

import { allUser } from "../controllers/user.controller.js";



const adminRouter = Router()


adminRouter.get('/', auth(['admin']), allUser)


export default adminRouter

