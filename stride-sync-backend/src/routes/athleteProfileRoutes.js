const express = require('express');
const router = express.Router();
const athleteProfileController = require('../controllers/athleteProfileController');

// CRUD Routes
router.get('/', athleteProfileController.getAllProfiles);
router.get('/:id', athleteProfileController.getProfileById);
router.post('/', athleteProfileController.createProfile);
router.put('/:id', athleteProfileController.updateProfile);
router.delete('/:id', athleteProfileController.deleteProfile);

// Additional Routes
router.get('/:id/event-counts-and-distance', athleteProfileController.getTotalEventCountsAndTotalTime);
router.get('/:id/distance', athleteProfileController.getTotalDistance);

module.exports = router;
