const mongoose = require('mongoose');

const SubscriptionsSchema = new mongoose.Schema({
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

const Subscriptions = mongoose.model('Subscriptions', SubscriptionsSchema);

module.exports = Subscriptions;