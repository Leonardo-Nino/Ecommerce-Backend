import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  code: { type: String, unique: true, require: true },
  pucharse_datetime: { type: Date, default: Date.now },
  amount: { type: Number, require: true },
  purchaser: { type: String, require: true },
})

export const orderModel = model('orders', orderSchema)
