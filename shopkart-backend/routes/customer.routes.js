import express from 'express';
import {
  registerCustomer,
  loginCustomer,
  getMyProfile,
  logoutCustomer,
  changePassword
} from '../controllers/customer.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.get('/me', protectRoute, getMyProfile);
router.post('/logout', protectRoute, logoutCustomer);
router.patch('/change-password', protectRoute, changePassword);

export default router;