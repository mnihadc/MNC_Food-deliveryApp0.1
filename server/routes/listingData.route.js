import express from 'express';
import { foodOrderData, listingFoodData, userOrderData } from '../controllers/listingData.controller.js';
import { verifyToken } from '../untils/verifyUser.js';

const router = express.Router();

router.post('/foodData', listingFoodData);
router.post('/orderData', verifyToken, foodOrderData);
router.post('/userOrder', verifyToken, userOrderData);

export default router;