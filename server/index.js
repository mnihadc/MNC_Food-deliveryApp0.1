import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!');
    }).catch((err) => {
        console.log("error  in connection to mongodb", err);
    })

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})