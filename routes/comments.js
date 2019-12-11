const express = require('express');
const router = express.Router();

const ctrl = require('../controllers');

// PATH = /api/v1/comments

// GET all comments
router.get('/', ctrl.comments.showAll);

// ADD new comment
router.post('/', ctrl.comments.addComment);

module.exports = router;