const db = require('../models');

const showAll = (req, res) => {
  db.Comment.find({})
  .populate('author')
  .populate('post')
  .exec((err, allComments) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      count: allComments.length,
      data: allComments,
    });
  });
};

const addComment = (req, res) => {
  db.Comment.create(req.body, (err, createdComment) => {
    if (err) return console.log(err);
    db.Post.findById(createdComment.post, (err, foundPost) => {
      if (err) return console.log(err);
      foundPost.comments.push(createdComment._id);
      foundPost.save((err, savedPost) => {
        if (err) console.log(err);
        db.User.findById(createdComment.author, (err, foundUser) => {
          if (err) return console.log(err);
          foundUser.comments.push(createdComment._id);
          foundUser.save((err, savedUser) => {
            if (err) console.log(err);
            res.json({
              status: 200,
              data: {createdComment, savedPost, savedUser},
            });
          });
        });
      });
    });
  });
};

module.exports = {
  showAll,
  addComment,
}