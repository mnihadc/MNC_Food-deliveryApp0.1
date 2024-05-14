import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listingData.route.js";
import cookieParser from 'cookie-parser';
import path from 'path';

global.food_items = [];
global.food_category = [];

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
}).then(async () => {
    console.log('Connected to MongoDB!');

    // Access the collections after the connection is established
    const db = mongoose.connection.db;
    const foodItemsCollection = db.collection('food-items');
    const foodCategoryCollection = db.collection('food-category');

    const __dirname=path.resolve();
    // Use Promise.all to wait for both queries to resolve
    const [foodItemsData, foodCategoryData] = await Promise.all([
        foodItemsCollection.find({}).toArray(),
        foodCategoryCollection.find({}).toArray(),
    ]);

    global.food_items = foodItemsData;
    global.food_category = foodCategoryData;

    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/user', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/listing', listingRouter);

    app.use(express.static(path.join(__dirname, '/client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    })
    app.listen(3000, () => {
        console.log("Server is running on port 3000!");
    });

}).catch((err) => {
    console.log("Error in connection to MongoDB", err);
});
