const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    signup: {
        type: Boolean,
        require: true,
        default : true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;