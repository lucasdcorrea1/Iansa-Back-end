import mongoose from "mongoose";

import Env from "../environment";

mongoose.connect(Env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

export default mongoose;
