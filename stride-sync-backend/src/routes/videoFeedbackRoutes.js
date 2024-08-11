// routes/videoFeedbackRoutes.js

const express = require('express');
const router = express.Router();
const videoFeedbackController = require('../controllers/videoFeedbackController');

// Create a new video feedback
router.post('/', videoFeedbackController.createVideoFeedback);

// Get all video feedback
router.get('/', videoFeedbackController.getAllVideoFeedbacks);

// Get a specific video feedback by ID
router.get('/:id', videoFeedbackController.getVideoFeedbackById);

// Update a specific video feedback by ID
router.put('/:id', videoFeedbackController.updateVideoFeedbackById);

// Delete a specific video feedback by ID
router.delete('/:id', videoFeedbackController.deleteVideoFeedbackById);

module.exports = router;
