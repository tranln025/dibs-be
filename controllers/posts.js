const db = require('../models');

// GET all posts
const showAll = (req, res) => {
  db.Post.find({})
  .populate('author')
  .populate('comments')
  .populate('currentDib')
  .populate('claimant')
  .exec((err, allPosts) => {
    if(err) return res.status(500).json({
      status: 500,
      message: err
    });
    res.status(200).json({
      status: 200,
      count: allPosts.length,
      data: allPosts
    });
  });
};

// GET one post
const show = (req, res) => {
  db.Post.findById(req.params.id)
  .populate('author')
  .populate('comments')
  .populate('currentDib')
  .populate('claimant')
  .exec((err, foundPost) => {
    if(err) return res.status(500).json({
      status: 500,
      message: err
    });
    res.status(200).json({
      status: 200,
      data: foundPost
    });
  });
};

// POST create post
const addPost = (req, res) => {
  req.body.author = req.session.currentUser.id;
  db.Post.create(req.body, (error, createdPost) => {
    if (error) return console.log(error);
    db.User.findById(createdPost.author, (err, foundUser) => {
      if (err) return console.log(err);
      foundUser.posts.push(createdPost._id);
      foundUser.save((err, updatedUser) => {
        if (err) return console.log(err);
        res.json({
          status: 201,
          data: updatedUser,
        });
      });
    });
  });
};

// PUT update one post
const updatePost = (req, res) => {
  db.Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost) => {
    if (err) return console.log(err);
    res.json({
      status: 201,
      data: updatedPost,
    });
  });
};


// DELETE one post
const deletePost = (req, res) => {
  db.Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
    if (error) return console.log(error);
    res.json({
      status: 200,
      data: deletedPost
    });
  });
};


module.exports = {
    showAll,
    show,
    addPost,
    updatePost,
    deletePost,
};