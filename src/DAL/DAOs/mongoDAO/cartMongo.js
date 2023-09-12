import { cartModel } from '../../mongoDB/models/carts.js'

export const newCart = async () => {
  try {
    const newCart = await cartModel.create({})
    return newCart
  } catch (error) {
    return error
  }
}

export const getCart = async (id) => {
  try {
    const producsCart = await cartModel.findById(id)
    return producsCart
  } catch (error) {
    return error
  }
}

export const updateCart = async (id, cart) => {
  try {
    const updateProduct = await cartModel.updateOne(id, cart)
    return updateProduct
  } catch (error) {
    return error
  }
}
