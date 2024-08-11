const db = require('../db');

// Get all race history entries
exports.getAllRaceHistory = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RaceHistory');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a race history entry by ID
exports.getRaceHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM RaceHistory WHERE RaceID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Race history not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new race history entry
exports.createRaceHistory = async (req, res) => {
  const { AthleteID, Event, RaceDate, RaceTime, RaceMark, Notes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO RaceHistory (AthleteID, Event, RaceDate, RaceTime, RaceMark, Notes) VALUES (?, ?, ?, ?, ?, ?)',
      [AthleteID, Event, RaceDate, RaceTime, RaceMark, Notes]
    );
    res.status(201).json({ RaceID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a race history entry
exports.updateRaceHistory = async (req, res) => {
  const { id } = req.params;
  const { AthleteID, Event, RaceDate, RaceTime, RaceMark, Notes } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE RaceHistory SET AthleteID = ?, Event = ?, RaceDate = ?, RaceTime = ?, RaceMark = ?, Notes = ? WHERE RaceID = ?',
      [AthleteID, Event, RaceDate, RaceTime, RaceMark, Notes, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Race history not found' });
    res.json({ message: 'Race history updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a race history entry
exports.deleteRaceHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM RaceHistory WHERE RaceID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Race history not found' });
    res.json({ message: 'Race history deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
