import { productModel } from '../../mongoDB/models/products.js'

//Get product has pagination configuration

export const getProducts = async (reqQuery) => {
  try {
    const sort = reqQuery.sort === 'desc' ? -1 : (reqQuery.sort = 0)

    const category = reqQuery.category

    const status = reqQuery.status

    const query = {}
    category ? (query.category = category) : ''
    status ? (query.status = status) : ''

    const options = {
      limit: parseInt(reqQuery.limit) || 10,
      page: parseInt(reqQuery.page) || 1,
      sort: { price: sort },
      lean: true,
    }

    const product = await productModel.paginate(query, options)
    return product
  } catch (error) {
    return error
  }
}

export const getProductsById = async (id) => {
  try {
    const productsById = await productModel.findById(id)

    return productsById
  } catch (error) {
    return error
  }
}

export const createProduct = async (obj) => {
  try {
    const newProduct = await productModel.create(obj)
    return newProduct
  } catch (error) {
    return error
  }
}

export const updateProduct = async (id, obj) => {
  try {
    const product = await productModel.findByIdAndUpdate({ _id: id }, obj)
    return product
  } catch (error) {
    return error
  }
}

export const productDelete = async (id) => {
  try {
    const productDelete = await productModel.deleteOne({ _id: id })
    return productDelete
  } catch (error) {
    return error
  }
}

export const deleteProduct = async (title) => {
  try {
    const deleteProduct = await productModel.deleteOne(title)
    return deleteProduct
  } catch (error) {
    return error
  }
}


