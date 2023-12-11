import express from 'express';
import { foodOrderData, listingFoodData } from '../controllers/listingData.controller.js';

const router = express.Router();

router.post('/foodData', listingFoodData);
router.post('/orderData', foodOrderData);

export default router;