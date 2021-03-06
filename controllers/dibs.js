const db = require('../models');

// GET all dibs
const showAll = (req, res) => {
  db.Dib.find({})
  .populate('post')
  .populate('dibber')
  .exec((err, allDibs) => {
    if(err) return res.status(500).json({
      status: 500,
      message: err
    });
    res.status(200).json({
      status: 200,
      count: allDibs.length,
      data: allDibs
    });
  });
};

// GET one dib
const show = (req, res) => {
  db.Dib.findById(req.params.id)
  .populate('post')
  .populate('dibber')
  .exec((err, foundDib) => {
    if(err) return res.status(500).json({
      status: 500,
      message: err
    });
    res.status(200).json({
      status: 200,
      data: foundDib
    });
  });
};

// POST create dib
const newDib = (req, res) => {
  console.log(req.body)
  db.Dib.create(req.body, (err, createdDib) => {
    if (err) return console.log(err);
    db.Post.findById(createdDib.post._id, (err, foundPost) => {
      if (err) return console.log(err);
      foundPost.currentDib = createdDib._id;
      foundPost.save((err, updatedPost) => {
        if (err) return console.log(err);
        res.json({
          status: 201,
          data: updatedPost,
        });
      });
    });
  });
};

// PUT update one dib
const updateDib = (req, res) => {
  db.Dib.findByIdAndUpdate(req.params.id, req.body, (err, updatedDib) => {
    if (err) return console.log(err);
    res.json({
      status: 201,
      data: updatedDib,
    });
  });
};


// DELETE one dib
const deleteDib = (req, res) => {
  db.Dib.findByIdAndDelete(req.params.id, (err, deletedDib) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: deletedDib
    });
  });
};


module.exports = {
    showAll,
    show,
    newDib,
    updateDib,
    deleteDib,
};