import Order from "../models/order.model.js";

export const listingFoodData = (req, res, next) => {
    try {
        res.json({
            foodCategory: global.food_category,
            foodItems: global.food_items
        });
    } catch (error) {
        next(error);
    }
}

export const foodOrderData = async (req, res, next) => {
    try {
        const orderData = req.body.order_data;
        const orderDate = new Date();
        
        const newOrder = new Order({
            email: req.body.email,
            order_data: orderData,
            order_date: orderDate
        });

        await newOrder.save();

        res.json({ success: true });
    } catch (error) {
        next(error);
    }
}

export const userOrderData = async (req, res, next) => {
    try {
        const userEmail = req.params.id;
        const myData = await Order.find({ 'email': userEmail });
        res.json({ orderData: myData });
    } catch (error) {
        next(error);
    }
}
