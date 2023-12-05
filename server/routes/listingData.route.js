import express from 'express';
import { listingFoodData } from '../controllers/listingData.controller.js';

const router = express.Router();

router.post('/foodData', listingFoodData);

export default router;