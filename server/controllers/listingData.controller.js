import order from "../models/order.model.js";

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
        const orderDate = new Date(); // Get the current date and time
        const data = req.body.order_data.map(item => ({ ...item, order_date: orderDate })); // Add order date to each item
        const eId = await order.findOne({ 'email': req.body.email });

        if (eId === null) {
            await order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        next(error);
    }
}

export const userOrderData = async (req, res, next) => {
    try {
        const userEmail = req.params.id;
        const myData = await order.find({ 'email': userEmail });
        res.json({ orderData: myData });
    } catch (error) {
        next(error);
    }
}
