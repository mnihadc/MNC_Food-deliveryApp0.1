import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
})

const order = mongoose.model('order', OrderSchema);
export default order;