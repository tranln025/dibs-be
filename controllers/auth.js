const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req, res) => {
  // Check that all required fields are filled out
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
    return res.json({ status: 400, message: 'Please fill out all required fields' });
  }

  // Check if username already exists
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) return res.json({ status: 500, message: 'Something went wrong. Please try again'});
    if (foundUser) return res.json({ status: 400, message: 'Something went wrong. Please try again'});

    // Check if email already exists
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) return res.json({ status: 500, message: 'Something went wrong. Please try again'});
      if (foundUser) return res.json({ status: 400, message: 'Something went wrong. Please try again'});

      // Generate salt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.json({ status: 500, message: 'Something went wrong. Please try again' });

        // Hash password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});
    
          const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hash,
          }
  
          db.User.create(newUser, (err, savedUser) => {
            if (err) return res.status(500).json({ status: 500, message: err});
            req.session.currentUser = { id: savedUser._id };
            return res.status(201).json({ status: 201, data: savedUser._id, message: 'Success' });
          });
        });
      });
    });
  });
};

//POST Login
const login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ status: 400, message: 'Please enter your username and password' });
  }
  
  db.User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });

    if (!foundUser) {
      return res.status(400).json({ status: 400, message: 'Username or password is incorrect'});
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });

      if (isMatch) {
        req.session.currentUser = { id: foundUser._id };
        return res.status(200).json({ status: 200, message: 'Success', data: foundUser._id });
      } else {
        return res.status(400).json({ status: 400, message: 'Username or password is incorrect' });
      }
    });
  });
};

//Post Logout
const logout = (req, res) => {
  if(!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ status: 500, message: 'Something went wrong, please try again' });
    res.sendStatus(200);
  });
};

module.exports = {
  register,
  login,
  logout
};