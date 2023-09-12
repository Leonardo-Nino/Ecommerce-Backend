import { promises as fs } from 'fs'

export class CartsManager {
  constructor(path) {
    this.path = path
  }

  static idGenerator() {
    this.IdGenerator ? this.IdGenerator++ : (this.IdGenerator = 1)

    return this.IdGenerator
  }

  async createCart() {
    const cartTxt = await fs.readFile(this.path, 'utf8')
    const carts = JSON.parse(cartTxt)

    const cart = {
      id: CartsManager.idGenerator(),
      products: [],
    }

    carts.push(cart)
    await fs.writeFile(this.path, JSON.stringify(carts))
    return 'Cart created'
  }

  async getCartById(id) {
    const cartTxt = await fs.readFile(this.path, 'utf-8')

    const carts = JSON.parse(cartTxt)

    const cartByid = carts.find((cart) => cart.id === parseInt(id))

    const result = cartByid !== undefined ? cartByid : 'Cart not found'

    return result
  }

  async addProductToCart(cid, pid, { quantity }) {
    const cartTxt = await fs.readFile(this.path, 'utf-8')

    const carts = JSON.parse(cartTxt)

    const cartByid = carts.find((cart) => cart.id === parseInt(cid)) //me devuelve el cart entero

    const products = cartByid.products // me devuelve los productos del cart

    const productIndex = products.findIndex(
      (prod) => prod.product === parseInt(pid)
    )

    if (productIndex === -1) {
      const prod = {
        product: parseInt(pid),
        quantity: 1,
      }
      cartByid.products.push(prod)
    } else {
      products[productIndex].quantity += quantity
    }
    await fs.writeFile(this.path, JSON.stringify(carts))
  }
}
