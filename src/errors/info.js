export const generateErrorAddProduct = (product) => {
  return `One or more propieties of the product were incomplete or invalid.
    List of propieties:
    Title: need to  by a string, received ${product.title}
    Description: need to  by a string, received ${product.description}
    Price: need to  by a number, received ${product.price}
    Code: need to by a string, received ${product.code}
    category: need to  by a string, received ${product.category}
    Stock: need to  by a number, received ${product.stock}`
}

export const generateErrorAddProductToCart = (product) => {
  return `One or more propieties  to add product to cart were incomplete or invalid.
  List of propieties:
  Product: need to  by a id from mongoDB, received ${product._id}, product not found`
}
