import express from 'express';
import { foodOrderData, listingFoodData, userOrderData } from '../controllers/listingData.controller.js';


const router = express.Router();

router.post('/foodData', listingFoodData);
router.post('/orderData', foodOrderData);
router.get('/userOrder/:id', userOrderData);

export default router;