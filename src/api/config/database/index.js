import mongoose from 'mongoose';

import Env from '../environment';

mongoose.connect(Env.mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

export default mongoose;
