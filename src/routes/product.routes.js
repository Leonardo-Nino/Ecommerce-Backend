import { Router } from 'express'

import { auth } from '../middleware/auth.js'

import {
  getAllProducts,
  getProductById,
  postNewProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product.controller.js'

const productsRouters = Router()

productsRouters.get('/', getAllProducts)

productsRouters.get('/:id', getProductById)

productsRouters.post('/', auth(['admin,premium']), postNewProduct)

productsRouters.put('/:id', auth(['admin,premium']), putProduct)

productsRouters.delete('/:id', auth(['admin,premium']), deleteProduct)

export default productsRouters
