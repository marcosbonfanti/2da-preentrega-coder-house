import { newCartI, cartI } from '../models/cart/cart.interface';
import { CartFactoryDAO } from '../models/cart/cart.factory';
import { TipoPersistencia } from '../models/cart/cart.factory';
import { productsAPI } from '../apis/productos';

import { cartQuery } from '../models/cart/cart.interface';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.Memoria;

class CartAPI {
  private cartItems;

  constructor() {
    this.cartItems = CartFactoryDAO.get(tipo);
  }

  async getProducts(id: string | undefined = undefined): Promise<cartI[]> {
    if (id) return this.cartItems.get(id);

    return this.cartItems.get();
  }

  async addProduct(cartData: string): Promise<cartI> {
    // const product = await productsAPI.getProducts(cartData._id.toString());
    const newCartItem = await this.cartItems.add(cartData);
    return newCartItem;
  }

  async deleteCartItem(id: string) {
    await this.cartItems.delete(id);
  }

  // async query(options: cartQuery) {
  //   return await this.cartItems.query(options);
  // }
}

export const cartAPI = new CartAPI();