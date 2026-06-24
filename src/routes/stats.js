const express = require('express');
const router = express.Router();
const { topGenres, topPlatforms, salesByYear, analyzeIdea } = require('../controllers/statsController');

router.get('/top-genres', topGenres);
router.get('/top-platforms', topPlatforms);
router.get('/sales-by-year', salesByYear);
router.get('/analyze', analyzeIdea);

module.exports = router;