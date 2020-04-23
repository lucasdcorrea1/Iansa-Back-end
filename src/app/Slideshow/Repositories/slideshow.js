'use strict';
const mongoose = require('../../../database');
const slideshow = mongoose.model('slideshow');

module.exports = {
    async getAll(){
        return await slideshow.find({}, {
     });
    },

    async post(data) {
        const post = await slideshow.create({
           data
          });
          return post;
    }
};
