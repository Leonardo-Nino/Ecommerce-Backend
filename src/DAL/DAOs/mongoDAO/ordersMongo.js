import { orderModel } from '../../mongoDB/models/orders.js'

export const newOrder = async (obj) => {
  try {
    const order = await orderModel.create(obj)
    return order
  } catch (error) {
    return error
  }
}
