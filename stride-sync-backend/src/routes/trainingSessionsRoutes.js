const express = require('express');
const router = express.Router();
const trainingSessionsController = require('../controllers/trainingSessionsController');

// CRUD Routes
router.get('/', trainingSessionsController.getAllSessions);
router.get('/:id', trainingSessionsController.getSessionById);
router.get('/athlete/:athleteId', trainingSessionsController.getSessionsByAthleteId); 
router.post('/', trainingSessionsController.createSession);
router.put('/:id', trainingSessionsController.updateSession);
router.delete('/:id', trainingSessionsController.deleteSession);

module.exports = router;
