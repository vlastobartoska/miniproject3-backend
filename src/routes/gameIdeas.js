const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createIdea, getIdeas } = require('../controllers/gameIdeasController');

router.post('/', protect, createIdea);
router.get('/', protect, getIdeas);

module.exports = router;