import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import {
  createCart,
  getProducFromCart,
  deleteAllProducsFromCart,
  addProductToCart,
  updateQuantity,
  deleteProductFromCart,
  generatePucharse,
} from '../controllers/cart.controller.js'

const cartsRouters = Router()

cartsRouters.post('/', createCart)

cartsRouters.get('/:cid', getProducFromCart)

cartsRouters.delete('/:cid', deleteAllProducsFromCart)

cartsRouters.post('/:cid/product/:pid', addProductToCart)

//auth(['user'])

cartsRouters.put('/:cid/product/:pid', updateQuantity)

cartsRouters.delete('/:cid/product/:pid', deleteProductFromCart)

cartsRouters.get('/:cid/purcharse', generatePucharse)

export default cartsRouters