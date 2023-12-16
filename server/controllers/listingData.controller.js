import order from "../models/order.model.js";

export const listingFoodData = (req, res, next) => {
    try {
        res.json({
            foodCategory: global.food_category,
            foodItems: global.food_items
        });
    } catch (error) {
        next(error);
        res.send("Server Error")
    }
}

export const foodOrderData = async (req, res, next) => {
    let data = req.body.order_data
    await data.splice(0, 0, { order_date: req.body.order_date })

    let eId = await order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await order.create({
                email: req.body.email,
                order_data: [data]
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message);
            next(error)
        }
    }
   
    else {
        try {
            await order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })

        } catch (error) {
            res.send("Server Error", error.message)
            next(error);
        }
    }
}

export const userOrderData = async (req, res, next) => {
    try {
        let myData = await order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })
    } catch (error) {
        res.send("Server Error", error.message)
        next(error)
    }
}
