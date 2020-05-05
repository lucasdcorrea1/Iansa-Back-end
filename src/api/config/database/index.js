import mongoose from 'mongoose';

import env from '../environment';

mongoose.connect(env.mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

export default mongoose;
