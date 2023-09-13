import { Router } from "express";
import { allUser } from "../controllers/user.controller.js";



const adminRouter = Router()



adminRouter.get('/', allUser)


export default adminRouter

