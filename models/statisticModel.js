const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;
