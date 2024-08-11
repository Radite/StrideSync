const db = require('../db');

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM AthleteProfile');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a profile by ID
exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM AthleteProfile WHERE AthleteID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Profile not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new profile
exports.createProfile = async (req, res) => {
  const { UserID, PrimaryEvent, SecondaryEvent, PersonalBests, TrainingExperience, PeakTiming, SeasonStart, AvailableEquipment, Strengths, Weaknesses } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO AthleteProfile (UserID, PrimaryEvent, SecondaryEvent, PersonalBests, TrainingExperience, PeakTiming, SeasonStart, AvailableEquipment, Strengths, Weaknesses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [UserID, PrimaryEvent, SecondaryEvent, JSON.stringify(PersonalBests), TrainingExperience, PeakTiming, SeasonStart, JSON.stringify(AvailableEquipment), JSON.stringify(Strengths), JSON.stringify(Weaknesses)]
    );
    res.status(201).json({ AthleteID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { PrimaryEvent, SecondaryEvent, PersonalBests, TrainingExperience, PeakTiming, SeasonStart, AvailableEquipment, Strengths, Weaknesses } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE AthleteProfile SET PrimaryEvent = ?, SecondaryEvent = ?, PersonalBests = ?, TrainingExperience = ?, PeakTiming = ?, SeasonStart = ?, AvailableEquipment = ?, Strengths = ?, Weaknesses = ? WHERE AthleteID = ?',
      [PrimaryEvent, SecondaryEvent, JSON.stringify(PersonalBests), TrainingExperience, PeakTiming, SeasonStart, JSON.stringify(AvailableEquipment), JSON.stringify(Strengths), JSON.stringify(Weaknesses), id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM AthleteProfile WHERE AthleteID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
