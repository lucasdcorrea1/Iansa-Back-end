import mongoose from '../../config/database';

const JobModel = mongoose.model('Job');

export default class JobDao {
  static async get() {
    await JobModel.find();
  }

  static async post(data) {
    const post = new JobModel(data);
    await post.save();
    return post;
  }
}
