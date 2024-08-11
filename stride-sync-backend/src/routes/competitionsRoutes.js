const express = require('express');
const router = express.Router();
const competitionsController = require('../controllers/competitionsController');

// CRUD Routes
router.get('/', competitionsController.getAllCompetitions);
router.get('/athlete/:athleteId', competitionsController.getCompetitionsByAthleteId);
router.get('/:id', competitionsController.getCompetitionById);
router.post('/', competitionsController.createCompetition);
router.put('/:id', competitionsController.updateCompetition);
router.delete('/:id', competitionsController.deleteCompetition);

module.exports = router;
