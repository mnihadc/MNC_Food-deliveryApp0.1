import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listingData.route.js";
import cookieParser from 'cookie-parser';
import path from 'path'; // Import the path module

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Serve the static files from the client directory
const clientDistPath = path.resolve(__dirname, '../client');
app.use(express.static(clientDistPath));

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(async () => { // Mark the function as async here
        console.log('Connected to MongoDB!');

        // Access the collections after the connection is established
        const db = mongoose.connection.db;
        const foodItemsCollection = db.collection('food-items');
        const foodCategoryCollection = db.collection('food-category');

        // Use Promise.all to wait for both queries to resolve
        const [foodItemsData, foodCategoryData] = await Promise.all([
            foodItemsCollection.find({}).toArray(),
            foodCategoryCollection.find({}).toArray(),
        ]);

        global.food_items = foodItemsData;
        global.food_category = foodCategoryData;

        // Set up your routes
        app.use('/api/user', userRouter);
        app.use('/api/auth', authRouter);
        app.use('/api/listing', listingRouter);

        // Ensure that all other routes serve the index.html file
        app.get('*', (req, res) => {
            res.sendFile(path.join(clientDistPath, 'index.html'));
        });

        app.listen(3000, () => {
            console.log('Server is running on port 3000!');
        });
    })
    .catch((err) => {
        console.log("Error in connection to MongoDB", err);
    });
