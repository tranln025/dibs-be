const db = require('../models');

// GET all users
const showAllUsers = (req, res) => {
  db.User.find({})
  .populate('posts')
  .populate('comments')
  .populate('dibsClaimed')
  .exec((err, allUsers) => {
    if (err) {
      return console.log(err)
    };
    res.json({
      status: 200,
      count: allUsers.length,
      data: allUsers,
    });
  });
};

// DELETE nuke all users
const deleteAllUsers = (req, res) => {
  db.User.deleteMany({}, (err, deletedCount) => {
    if (err) return console.log(err);
      res.json({
      status: 200,
      deletedCount: deletedCount
    });
  });
};

// GET show one user
const show = (req, res) => {
  if(!req.session.currentUser) return res.status(401).json({
    status: 401,
    message: 'Please log in and try again'
  });

  db.User.findById(req.session.currentUser.id)
  .populate('posts')
  .populate('comments')
  .populate('dibsClaimed')
  .exec((err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      message: err
    });

    res.status(200).json({
      status: 200,
      data: foundUser
    });
  });
};

// UPDATE one user
const update = (req, res) => {

  if(!req.session.currentUser) return res.status(401).json({
  status: 401,
  message: 'Please log in and try again'
  });

  db.User.findById(req.session.currentUser.id, (err, updatedUser) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: updatedUser,
    });
  });
};


module.exports = {
  show,
  update,
  showAllUsers,
  deleteAllUsers
};