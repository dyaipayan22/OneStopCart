import express from 'express';
import {
  addToCart,
  clearCart,
  getItemsFromCart,
  removeItemFromCart,
} from '../controllers/cartController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add').post(verifyJWT, addToCart);
router.route('/delete').put(verifyJWT, removeItemFromCart);
router.route('/').get(verifyJWT, getItemsFromCart);
router.route('/clearCart').put(verifyJWT, clearCart);

export default router;
