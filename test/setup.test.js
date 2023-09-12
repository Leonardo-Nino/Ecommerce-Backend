import 'dotenv/config'
import mongoose from 'mongoose'
import { userModel } from '../src/DAL/mongoDB/models/user.js'
import { cartModel } from '../src/DAL/mongoDB/models/carts.js'
import { productModel } from '../src/DAL/mongoDB/models/products.js'


before(async () => {
    await mongoose.connect(process.env.URL_MONGOOSE)
})

after(async () => {
    await mongoose.connection.close()
})


// borra toda la coleccion  NO USAR

// export const dropUser = async () => {
//     await userModel.collection.drop()
// }

// export const dropProduct = async () => {
//     await productModel.collection.drop()
// }

// export const dropCart = async () => {
//     await cartModel.collection.drop()
// }