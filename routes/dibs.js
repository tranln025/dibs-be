const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/dibs

// GET all dibs
router.get('/', ctrl.dibs.showAll);

// GET one dib
router.get('/:id', ctrl.dibs.show);

// POST create dib
router.post('/', ctrl.dibs.newDib);

// PUT update dib
router.put('/:id', ctrl.dibs.updateDib);

// DELETE one dib
router.delete('/:id', ctrl.dibs.deleteDib);

module.exports = router;