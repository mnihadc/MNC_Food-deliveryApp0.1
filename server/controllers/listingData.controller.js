import order from "../models/order.model.js";
import jwt from 'jsonwebtoken';
import { handleError } from '../untils/error.js';

export const listingFoodData = (req, res, next) => {
    try {
        res.json({
            foodCategory: global.food_category,
            foodItems: global.food_items
        });
    } catch (error) {
        next(error);
        res.status(500).send("Server Error");
    }
}
export const foodOrderData = async (req, res, next) => {
    try {
        const orderData = req.body.order_data;
        const orderDate = req.body.order_date;

        orderData.unshift({ order_date: orderDate });

        const token = req.cookies.access_token;
        if (!token) {
            return next(handleError(401, 'Unauthorized. Access token not found.'));
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return next(handleError(401, 'Unauthorized. Invalid access token.'));
            }            

            const userEmail = user.email;

            
            const existingOrder = await order.findOne({ email: userEmail });

            if (existingOrder) {
                
                await order.findOneAndUpdate(
                    { email: userEmail },
                    { $push: { order_data: orderData } }
                );
            } else {
                
                const newOrder = new order({ email: userEmail, order_data: [orderData] });
                await newOrder.save();
            }

            res.json({ success: true });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        next(error);
    }
}



export const userOrderData = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return next(handleError(401, 'Unauthorized. Access token not found.'));
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return next(handleError(401, 'Unauthorized. Invalid access token.'));
            }

            
            const userFromToken = user;

            
            const myData = await order.findOne({ 'email': userFromToken.email });

            res.json({ orderData: myData });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        next(error);
    }
}
