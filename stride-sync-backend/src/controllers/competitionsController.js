const db = require('../db');

// Get all competitions
exports.getAllCompetitions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Competitions');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a competition by ID
exports.getCompetitionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Competitions WHERE CompetitionID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Competition not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new competition
exports.createCompetition = async (req, res) => {
  const { AthleteID, CompetitionName, CompetitionDate, EventResults, Notes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Competitions (AthleteID, CompetitionName, CompetitionDate, EventResults, Notes) VALUES (?, ?, ?, ?, ?)',
      [AthleteID, CompetitionName, CompetitionDate, JSON.stringify(EventResults), Notes]
    );
    res.status(201).json({ CompetitionID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a competition
exports.updateCompetition = async (req, res) => {
  const { id } = req.params;
  const { AthleteID, CompetitionName, CompetitionDate, EventResults, Notes } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Competitions SET AthleteID = ?, CompetitionName = ?, CompetitionDate = ?, EventResults = ?, Notes = ? WHERE CompetitionID = ?',
      [AthleteID, CompetitionName, CompetitionDate, JSON.stringify(EventResults), Notes, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Competition not found' });
    res.json({ message: 'Competition updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a competition
exports.deleteCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM Competitions WHERE CompetitionID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Competition not found' });
    res.json({ message: 'Competition deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all competitions for a given athlete ID
exports.getCompetitionsByAthleteId = async (req, res) => {
  const { athleteId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Competitions WHERE AthleteID = ?', [athleteId]);
    if (rows.length === 0) return res.status(404).json({ error: 'No competitions found for this athlete' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
