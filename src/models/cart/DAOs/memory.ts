import {
    newCartI,
    cartI,
    cartBaseClass
  } from '../cart.interface';
import { productsAPI } from '../../../apis/productos';


  
export class CartMemDAO implements cartBaseClass {
  private cart: cartI[] = [];
  
  constructor() {
    const mockData = [
      { _id: '1', nombre: 'lapiz', precio: 200, productId: "32" },
      { _id: '2', nombre: 'cartuchera', precio: 250, productId: "33" },
      { _id: '3', nombre: 'boligoma', precio: 260, productId: "34" },
    ];

    mockData.forEach((aMock) => this.cart.push(aMock));
  }
  
  findIndex(id: string) {
    return this.cart.findIndex((aItem) => aItem._id === id);
  }
  
  find(id: string): cartI | undefined {
    return this.cart.find((aItem) => aItem._id === id);
  }
  
  async get(id?: string): Promise<cartI[]> {
    if (id) {
      return this.cart.filter((aItem) => aItem._id === id);
    }
    return this.cart;
  }
  
  async add(data: newCartI): Promise<cartI> {
    const productData = await productsAPI.getProducts(data.productId)
    const newItem: cartI = {
      _id: (this.cart.length + 1).toString(),
      nombre: productData[0].nombre,
      precio: productData[0].precio,
      productId: productData[0]._id
    };

    this.cart.push(newItem);

    return newItem;
  }
  
  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.cart.splice(index, 1);
  }
  
}