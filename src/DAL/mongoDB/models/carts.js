import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  products: {
    type: [
      {
        _id: false,
        id_product: { type: Schema.Types.ObjectId, ref: 'product' },
        quantity: Number,
      },
    ],
    default: [],
  },
})

cartSchema.pre('find', function () {
  this.populate('products.id_product')
})

export const cartModel = model('carts', cartSchema)
