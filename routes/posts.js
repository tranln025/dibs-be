const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/posts

// GET all posts
router.get('/', ctrl.posts.showAll);

// GET one post
router.get('/:id', ctrl.posts.show);

// POST create post
router.post('/new', ctrl.posts.addPost);

// PUT update post
router.put('/:id', ctrl.posts.updatePost);

// DELETE one post
router.delete('/:id', ctrl.posts.deletePost);

module.exports = router;