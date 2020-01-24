'use strict';
const mongoose = require('../../database');
const slideshow = mongoose.model('transparency');

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
