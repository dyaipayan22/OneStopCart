import express from 'express';
import {
  deleteUserProfile,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);

router.use(verifyJWT);

router
  .route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);

router.use(admin);

router.route('/').get(getUsers);
router.route('/:id').get(getUserById);

export default router;
