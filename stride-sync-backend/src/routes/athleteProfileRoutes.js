const express = require('express');
const router = express.Router();
const athleteProfileController = require('../controllers/athleteProfileController');

// CRUD Routes
router.get('/', athleteProfileController.getAllProfiles);
router.get('/:id', athleteProfileController.getProfileById);
router.post('/', athleteProfileController.createProfile);
router.put('/:id', athleteProfileController.updateProfile);
router.delete('/:id', athleteProfileController.deleteProfile);

module.exports = router;
