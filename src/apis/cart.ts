import { newCartI, cartI } from '../models/cart/cart.interface';
import { CartFactoryDAO, TipoPersistencia } from '../models/cart/cart.factory';
import { productsAPI } from './productos'
 
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class CartAPI {
  private cartItems;

  constructor() {
    this.cartItems = CartFactoryDAO.get(tipo);
    console.log(this.cartItems);
  }

  async getProducts(id: string | undefined = undefined): Promise<cartI[]> {
    if (id) return this.cartItems.get(id);

    return this.cartItems.get();
  }

  async addProduct(productId: string): Promise<cartI> {
    const productData = await productsAPI.getProducts(productId)
    const queryProductData: newCartI = {
      nombre: productData[0].nombre,
      precio: productData[0].precio,
      productId: productData[0]._id
    };
    
    const newCartItem = await this.cartItems.add(queryProductData);
    return newCartItem;
  }

  async deleteCartItem(id: string) {
    await this.cartItems.delete(id);
  }
}

export const cartAPI = new CartAPI();