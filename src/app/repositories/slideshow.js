'use strict';
const mongoose = require('../../database');
const slideshow = mongoose.model('slideshow');

module.exports = {
    async getAll(){
        return await slideshow.find({}, {
     });
    },
};

