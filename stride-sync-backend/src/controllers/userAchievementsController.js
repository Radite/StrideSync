const db = require('../db');

// Get all user achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM UserAchievements');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user achievement by ID
exports.getAchievementById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM UserAchievements WHERE AchievementID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Achievement not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user achievement
exports.createAchievement = async (req, res) => {
  const { UserID, AchievementDate, AchievementType, AchievementDetails, Notes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO UserAchievements (UserID, AchievementDate, AchievementType, AchievementDetails, Notes) VALUES (?, ?, ?, ?, ?)',
      [UserID, AchievementDate, AchievementType, AchievementDetails, Notes]
    );
    res.status(201).json({ AchievementID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user achievement
exports.updateAchievement = async (req, res) => {
  const { id } = req.params;
  const { UserID, AchievementDate, AchievementType, AchievementDetails, Notes } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE UserAchievements SET UserID = ?, AchievementDate = ?, AchievementType = ?, AchievementDetails = ?, Notes = ? WHERE AchievementID = ?',
      [UserID, AchievementDate, AchievementType, AchievementDetails, Notes, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Achievement not found' });
    res.json({ message: 'Achievement updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user achievement
exports.deleteAchievement = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM UserAchievements WHERE AchievementID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Achievement not found' });
    res.json({ message: 'Achievement deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
