import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  getPlacedOrder,
} from '../controllers/orderController.js';
import { admin, verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyJWT);
router.route('/lastOrder').get(getPlacedOrder);
router.route('/').post(createOrder).get(getOrders).get(admin, getAllOrders);

router.route('/:id').get(getOrderById);

export default router;
