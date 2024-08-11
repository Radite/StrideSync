const db = require('../db');

// Get all training sessions
exports.getAllSessions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM TrainingSessions');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a session by ID
exports.getSessionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM TrainingSessions WHERE SessionID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Session not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new training session
exports.createSession = async (req, res) => {
  const { AthleteID, SessionDate, SessionType, EventDetails, SpecialConditions, CumulativeDistance, IntensityPercentage, Notes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO TrainingSessions (AthleteID, SessionDate, SessionType, EventDetails, SpecialConditions, CumulativeDistance, IntensityPercentage, Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [AthleteID, SessionDate, SessionType, JSON.stringify(EventDetails), JSON.stringify(SpecialConditions), CumulativeDistance, IntensityPercentage, Notes]
    );
    res.status(201).json({ SessionID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a training session
exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const { AthleteID, SessionDate, SessionType, EventDetails, SpecialConditions, CumulativeDistance, IntensityPercentage, Notes } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE TrainingSessions SET AthleteID = ?, SessionDate = ?, SessionType = ?, EventDetails = ?, SpecialConditions = ?, CumulativeDistance = ?, IntensityPercentage = ?, Notes = ? WHERE SessionID = ?',
      [AthleteID, SessionDate, SessionType, JSON.stringify(EventDetails), JSON.stringify(SpecialConditions), CumulativeDistance, IntensityPercentage, Notes, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Session not found' });
    res.json({ message: 'Session updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a training session
exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM TrainingSessions WHERE SessionID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Session not found' });
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all sessions by AthleteID
exports.getSessionsByAthleteId = async (req, res) => {
  const { athleteId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM TrainingSessions WHERE AthleteID = ?', [athleteId]);
    if (rows.length === 0) return res.status(404).json({ error: 'No sessions found for this athlete' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

