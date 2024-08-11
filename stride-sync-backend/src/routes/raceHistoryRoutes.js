const express = require('express');
const router = express.Router();
const raceHistoryController = require('../controllers/raceHistoryController');

// CRUD Routes
router.get('/', raceHistoryController.getAllRaceHistory);
router.get('/:id', raceHistoryController.getRaceHistoryById);
router.post('/', raceHistoryController.createRaceHistory);
router.put('/:id', raceHistoryController.updateRaceHistory);
router.delete('/:id', raceHistoryController.deleteRaceHistory);

module.exports = router;
