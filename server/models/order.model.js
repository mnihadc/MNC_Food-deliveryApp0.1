import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    order_data: {
        type: Array,
        required: true,
    },
    order_date: {
        type: Date, 
        default: Date.now
    }
});

// Remove unique constraint from email field
OrderSchema.index({ email: 1 }, { unique: false });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
