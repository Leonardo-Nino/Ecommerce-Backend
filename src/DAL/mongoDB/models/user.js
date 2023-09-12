import { Schema, model } from 'mongoose'
import { cartModel } from './carts.js'

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  role: {
    type: String,
    default: 'user',
  },
  documents: {
    type: [
      {
        name: String,
        reference: String
      }

    ]
  },
  password: String,
  last_connections: {
    type: Date,
    default: Date.now

  },

  cart: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  },
})

//hook before create user

userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next()
  }

  try {
    const newcart = new cartModel()

    await newcart.save()

    this.cart = newcart._id

    return next()
  } catch (error) {
    return next(error)
  }
})

export const userModel = model('user', userSchema)
