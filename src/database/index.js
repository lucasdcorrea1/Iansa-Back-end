const mongoose = require('mongoose');
const Env = require( "../config/environment");

mongoose.connect(Env.mongo_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;