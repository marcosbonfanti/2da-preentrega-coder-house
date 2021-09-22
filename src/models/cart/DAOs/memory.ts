import {
    newCartI,
    cartI,
    cartBaseClass,
    cartQuery,
  } from '../cart.interface';
import { productsAPI } from '../../../apis/productos';


  
  export class CartMemDAO implements cartBaseClass {
    private cart: cartI[] = [];
  
    constructor() {
      const mockData = [
        { _id: '1', nombre: 'lapiz', precio: 200 },
        { _id: '2', nombre: 'cartuchera', precio: 250 },
        { _id: '3', nombre: 'boligoma', precio: 260 },
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
  
    async add(data: string): Promise<cartI> {
      console.log(data)
      const productData = await productsAPI.getProducts(data.toString())
      const newItem: cartI = {
        _id: (this.cart.length + 1).toString(),
        nombre: productData[0].nombre,
        precio: productData[0].precio,
      };
  
      this.cart.push(newItem);
  
      return newItem;
    }
  
    async delete(id: string): Promise<void> {
      const index = this.findIndex(id);
      this.cart.splice(index, 1);
    }
  
    // async query(options: cartQuery): Promise<cartI[]> {
    // //   type Conditions = (aProduct: ProductI) => boolean;
    // //   const query: Conditions[] = [];
  
    // //   if (options.nombre)
    // //     query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);
  
    // //   if (options.precio)
    // //     query.push((aProduct: ProductI) => aProduct.precio == options.precio);
  
    // //   return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
    // }
  }