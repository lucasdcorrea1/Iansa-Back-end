'use strict';
const mongoose = require('../../Database');
const slideshow = mongoose.model('slideshow');

module.exports = {
    async getAll(){
        return await slideshow.find({}, {
     });
    },

    async post(data) {
        console.log(`data ${data}`)
        const test = await slideshow.create({
           data
          });
          return test;
    },
};
