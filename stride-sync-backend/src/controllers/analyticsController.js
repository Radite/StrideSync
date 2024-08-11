const db = require('../db');

// Get all analytics data
exports.getAllAnalytics = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Analytics');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get analytics data by ID
exports.getAnalyticsById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Analytics WHERE AnalyticsID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Analytics not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new analytics data
exports.createAnalytics = async (req, res) => {
  const { AthleteID, TrainingData, CompetitionData, PerformanceMetrics } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Analytics (AthleteID, TrainingData, CompetitionData, PerformanceMetrics) VALUES (?, ?, ?, ?)',
      [AthleteID, JSON.stringify(TrainingData), JSON.stringify(CompetitionData), JSON.stringify(PerformanceMetrics)]
    );
    res.status(201).json({ AnalyticsID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update analytics data
exports.updateAnalytics = async (req, res) => {
  const { id } = req.params;
  const { AthleteID, TrainingData, CompetitionData, PerformanceMetrics } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Analytics SET AthleteID = ?, TrainingData = ?, CompetitionData = ?, PerformanceMetrics = ? WHERE AnalyticsID = ?',
      [AthleteID, JSON.stringify(TrainingData), JSON.stringify(CompetitionData), JSON.stringify(PerformanceMetrics), id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Analytics not found' });
    res.json({ message: 'Analytics updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete analytics data
exports.deleteAnalytics = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM Analytics WHERE AnalyticsID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Analytics not found' });
    res.json({ message: 'Analytics deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
