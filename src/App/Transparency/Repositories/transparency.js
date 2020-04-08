'use strict';
const mongoose = require('../../../Database');
const slideshow = mongoose.model('transparency');

module.exports = {
    async getAll(){
        return await slideshow.find({}, {});
    },

    async post(data) {
        const test = await slideshow.create({
           data
          });
          return test;
    },
};
