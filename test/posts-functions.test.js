const { deleteComment } = require('../routes/api/posts-functions');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const PostModel = require('../models/Post');
let req;
let res;
const postData = {
  user: 'superUser',
  text: 'Male',
  name: 'hehe',
  avatar: 'hehe',
  likes: [],
  comments: [],
  date: new Date(),
};

describe('test', () => {
  beforeEach(async () => {
    res = httpMocks.createResponse();
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  test('empty params returns 404', () => {
    req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/notUsed',
    });
    deleteComment(req, res);
    expect(res.statusCode).toBe(404);
  });
  test('valid params.id retrieves from db and returns 200', async () => {
    req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/comment/1',
      params: { id: 1 },
    });
    const validPost = new PostModel(postData);
    const savedPost = await validPost.save();

    expect(savedUser._id).toBeDefined();

    console.log(req.params.id);
    deleteComment(req, res);
    expect(res.statusCode).toBe(200);
  });
});
