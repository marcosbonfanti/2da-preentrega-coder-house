import { Request, Response, NextFunction } from 'express';
import { cartAPI } from '../apis/cart';
// import { productsAPI } from '../apis/productos';
// import { cartQuery } from '../models/cart/cart.interface';

class Cart {
    async checkCartItemExists(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      const producto = await cartAPI.getProducts(id);
      if (!producto.length) {
        return res.status(404).json({
          msg: 'Cart item not found',
        });
      }
      next();
    }
  
    async getProducts(req: Request, res: Response) {
      const { id } = req.params;
      if (id) {
        const result = await cartAPI.getProducts(id);
        if (!result.length)
          return res.status(404).json({
            data: 'objeto no encontrado',
          });
  
        return res.json({
          data: result,
        });
      }
  
      res.json({
        data: await cartAPI.getProducts(),
      });
    }
  
    async addProducts(req: Request, res: Response) {
      console.log(req.params);
			const newItem = await cartAPI.addProduct(req.params.id);
  
      res.json({
        msg: 'producto agregado con exito',
        data: newItem,
      });
    }
  
    async deleteProducts(req: Request, res: Response) {
      const id = req.params.id;
      await cartAPI.deleteCartItem(id);
      res.json({
        msg: 'producto borrado',
      });
    }
  }
  
  export const cartController = new Cart();