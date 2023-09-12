import { Router } from 'express'
import { uploader } from '../middleware/multer.js'


import { changeUserRole, upLoadDocuments } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/primium/:uid', changeUserRole)

userRouter.post('/:uid/documents', uploader.single('file'), upLoadDocuments)

// middleware



export default userRouter
