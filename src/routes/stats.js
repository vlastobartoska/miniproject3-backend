const express = require('express');
const router = express.Router();
const { topGenres, topPlatforms, salesByYear } = require('../controllers/statsController');

router.get('/top-genres', topGenres);
router.get('/top-platforms', topPlatforms);
router.get('/sales-by-year', salesByYear);

module.exports = router;