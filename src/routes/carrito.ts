import { Router } from 'express';
import { cartController } from '../controllers/cart'
import asyncHandler from 'express-async-handler';
import { productsController } from '../controllers/productos';


const router = Router();

router.get('/', asyncHandler(cartController.getProducts));

router.get(
  '/:id',
  cartController.checkCartItemExists,
  asyncHandler(cartController.getProducts)
);

router.post(
  '/:id',
  productsController.checkProductExists,
  asyncHandler(cartController.addProducts)
);

router.delete(
  '/:id',
  cartController.checkCartItemExists,
  asyncHandler(cartController.deleteProducts)  
);

export default router;
