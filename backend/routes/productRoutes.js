import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js';
import { verifyJWT, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(verifyJWT, admin, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(verifyJWT, admin, updateProduct)
  .delete(verifyJWT, admin, deleteProduct);

router.route('/:id/reviews').post(verifyJWT, createProductReview);

export default router;
