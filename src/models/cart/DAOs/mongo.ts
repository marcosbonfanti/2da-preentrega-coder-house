import mongoose from 'mongoose';
import {
  newCartI,
  cartI,
  cartBaseClass
} from '../cart.interface';
import { productsAPI } from '../../../apis/productos';
import Config from '../../../config';

const cartSchema = new mongoose.Schema<cartI>({
  nombre: String,
  precio: Number,
  productId: String,
});

export class CartMongoDAO implements cartBaseClass {
  private srv: string;
  private cartItems;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.cartItems = mongoose.model<cartI>('carrito', cartSchema);
  }    

  async get(id?: string): Promise<cartI[]> {
    let output: cartI[] = [];
    try {
      if (id) {
        const document = await this.cartItems.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.cartItems.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: newCartI): Promise<cartI> {
    const productData = await productsAPI.getProducts(data.productId);
    const newItem: newCartI = {
      nombre: productData[0].nombre,
      precio: productData[0].precio,
      productId: productData[0]._id      
    }
    
    const newCartItem = new this.cartItems(newItem);
    await newCartItem.save();
    return newCartItem;
  }  

  async delete(id: string): Promise<void> {
    await this.cartItems.findByIdAndDelete(id);
  }

}