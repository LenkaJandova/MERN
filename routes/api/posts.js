const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/Post');

//Load Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../validation/post');
const User = require('../../models/User');
const { session } = require('passport');
const { json } = require('body-parser');

// @route  GET api/posts/test
// @desc   Tests posts route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

// @route  Get api/posts/all
// @desc   Show all posts
// @access Public

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsound: 'No posts found' }));
});

// 1.version with populate
// router.get('/all', (req, res) => {
//   const errors = {};

//   Post.find()
//     .populate('user', ['name', 'avatar', 'text'])
//     .then((posts) => {
//       if (!posts) {
//         errors.noposts = 'There are no posts';
//         return res.status(400).json(errors);
//       }
//       res.json(posts);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// @route  Get api/posts
// @desc   Show posts for current profile
// @access Private

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Post.find({ user: req.user.id })
      .then((posts) => {
        if (!posts) {
          errors.noposts = 'There are no posts for this user';
          return res.status(404).json(errors);
        }
        res.json(posts);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route  POST api/posts/:id
// @desc   Get post by id
// @access Public

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostound: 'No post found with that ID' })
    );
});

// @route  DELETE api/posts/:id
// @desc   Delete post by id
// @access Private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user.id);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          console.log(post);
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }
          // Delete
          post.remove().then(() => res.json({ succes: true }));
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ postnotfound: 'No post found' });
        });
    });
  }
);

// @route  POST api/posts/like/:id
// @desc   Like a post
// @access Private

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user.id);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check if the user already liked that post
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id into likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ postnotfound: 'No post found' });
        });
    });
  }
);

// @route  POST api/posts/unlike/:id
// @desc   Unlike a post
// @access Private

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('user ID:' + req.user.id);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check if the user wants to unlike his own post
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          console.log('removeIndex:' + removeIndex);
          // Remove user from likes array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then((post) => res.json(post));
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ postnotfound: 'No post found' });
        });
    });
  }
);

// @route  POST api/posts/comment/:id
// @desc   Post a comment
// @access Private

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        // Add to comments array
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ nopostound: 'No post found' }));
  }
);

module.exports = router;
