const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// CRUD Routes
router.get('/', analyticsController.getAllAnalytics);
router.get('/:id', analyticsController.getAnalyticsById);
router.post('/', analyticsController.createAnalytics);
router.put('/:id', analyticsController.updateAnalytics);
router.delete('/:id', analyticsController.deleteAnalytics);

module.exports = router;
