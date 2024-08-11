const express = require('express');
const router = express.Router();
const userAchievementsController = require('../controllers/userAchievementsController');

// CRUD Routes
router.get('/', userAchievementsController.getAllAchievements);
router.get('/:id', userAchievementsController.getAchievementById);
router.post('/', userAchievementsController.createAchievement);
router.put('/:id', userAchievementsController.updateAchievement);
router.delete('/:id', userAchievementsController.deleteAchievement);

module.exports = router;
