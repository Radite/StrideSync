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
  const { 
    UserID, 
    PrimaryEvent, 
    SecondaryEvent, 
    PersonalBests, 
    TrainingExperience, 
    PeakTiming, 
    SeasonStart, 
    AvailableEquipment, 
    Strengths, 
    Weaknesses, 
    TotalTimesTripleJump = 0, 
    TotalDistanceRan = 0, 
    TotalTimeRan = 0, 
    TotalTimesLongJumped = 0, 
    TotalTimesHighJumped = 0, 
    TotalTimesShotPut = 0, 
    TotalTimesDiscusThrown = 0, 
    TotalTimesJavelinThrown = 0, 
    TotalTimesHammerThrown = 0, 
    TotalTimesPoleVaulted = 0, 
    TotalDistanceLongJumped = 0, 
    TotalDistanceHighJumped = 0, 
    TotalDistanceShotPut = 0, 
    TotalDistanceDiscusThrown = 0, 
    TotalDistanceJavelinThrown = 0, 
    TotalDistanceHammerThrown = 0, 
    TotalDistancePoleVaulted = 0, 
    TotalDistanceTripeJumped = 0 
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO AthleteProfile (
        UserID, 
        PrimaryEvent, 
        SecondaryEvent, 
        PersonalBests, 
        TrainingExperience, 
        PeakTiming, 
        SeasonStart, 
        AvailableEquipment, 
        Strengths, 
        Weaknesses, 
        TotalTimesTripleJump, 
        TotalDistanceRan, 
        TotalTimeRan, 
        TotalTimesLongJumped, 
        TotalTimesHighJumped, 
        TotalTimesShotPut, 
        TotalTimesDiscusThrown, 
        TotalTimesJavelinThrown, 
        TotalTimesHammerThrown, 
        TotalTimesPoleVaulted, 
        TotalDistanceLongJumped, 
        TotalDistanceHighJumped, 
        TotalDistanceShotPut, 
        TotalDistanceDiscusThrown, 
        TotalDistanceJavelinThrown, 
        TotalDistanceHammerThrown, 
        TotalDistancePoleVaulted, 
        TotalDistanceTripeJumped
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        UserID, 
        PrimaryEvent, 
        SecondaryEvent, 
        JSON.stringify(PersonalBests), 
        TrainingExperience, 
        PeakTiming, 
        SeasonStart, 
        JSON.stringify(AvailableEquipment), 
        JSON.stringify(Strengths), 
        JSON.stringify(Weaknesses), 
        TotalTimesTripleJump, 
        TotalDistanceRan, 
        TotalTimeRan, 
        TotalTimesLongJumped, 
        TotalTimesHighJumped, 
        TotalTimesShotPut, 
        TotalTimesDiscusThrown, 
        TotalTimesJavelinThrown, 
        TotalTimesHammerThrown, 
        TotalTimesPoleVaulted, 
        TotalDistanceLongJumped, 
        TotalDistanceHighJumped, 
        TotalDistanceShotPut, 
        TotalDistanceDiscusThrown, 
        TotalDistanceJavelinThrown, 
        TotalDistanceHammerThrown, 
        TotalDistancePoleVaulted, 
        TotalDistanceTripeJumped
      ]
    );
    res.status(201).json({ AthleteID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a profile
// Update a profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const {
    PrimaryEvent, 
    SecondaryEvent, 
    PersonalBests, 
    TrainingExperience, 
    PeakTiming, 
    SeasonStart, 
    AvailableEquipment, 
    Strengths, 
    Weaknesses, 
    TotalTimesTripleJump, 
    TotalDistanceRan, 
    TotalTimeRan, 
    TotalTimesLongJumped, 
    TotalTimesHighJumped, 
    TotalTimesShotPut, 
    TotalTimesDiscusThrown, 
    TotalTimesJavelinThrown, 
    TotalTimesHammerThrown, 
    TotalTimesPoleVaulted, 
    TotalDistanceLongJumped, 
    TotalDistanceHighJumped, 
    TotalDistanceShotPut, 
    TotalDistanceDiscusThrown, 
    TotalDistanceJavelinThrown, 
    TotalDistanceHammerThrown, 
    TotalDistancePoleVaulted, 
    TotalDistanceTripleJumped // Corrected typo from TotalDistanceTripeJumped
  } = req.body;

  try {
    // Build the SQL SET part dynamically based on which fields are provided
    let setClause = [];
    let values = [];
    
    const fields = {
      PrimaryEvent,
      SecondaryEvent,
      PersonalBests: JSON.stringify(PersonalBests),
      TrainingExperience,
      PeakTiming,
      SeasonStart,
      AvailableEquipment: JSON.stringify(AvailableEquipment),
      Strengths: JSON.stringify(Strengths),
      Weaknesses: JSON.stringify(Weaknesses),
      TotalTimesTripleJump,
      TotalDistanceRan,
      TotalTimeRan,
      TotalTimesLongJumped,
      TotalTimesHighJumped,
      TotalTimesShotPut,
      TotalTimesDiscusThrown,
      TotalTimesJavelinThrown,
      TotalTimesHammerThrown,
      TotalTimesPoleVaulted,
      TotalDistanceLongJumped,
      TotalDistanceHighJumped,
      TotalDistanceShotPut,
      TotalDistanceDiscusThrown,
      TotalDistanceJavelinThrown,
      TotalDistanceHammerThrown,
      TotalDistancePoleVaulted,
      TotalDistanceTripleJumped // Corrected typo from TotalDistanceTripeJumped
    };

    Object.keys(fields).forEach(key => {
      if (fields[key] !== undefined && fields[key] !== null) {
        setClause.push(`${key} = ?`);
        values.push(fields[key]);
      }
    });

    // Add the id at the end of the values array
    values.push(id);

    if (setClause.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    // Construct SQL query
    const sql = `UPDATE AthleteProfile SET ${setClause.join(', ')} WHERE AthleteID = ?`;
    
    const [result] = await db.query(sql, values);
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

// Get total number of times each event was done and total distance ran
exports.getTotalEventCountsAndTotalTime = async (req, res) => {
  try {
    // Adjust the query to get aggregated data for a specific profile or criteria
    const [rows] = await db.query(`
      SELECT 
        TotalTimesLongJumped AS totalLongJumps,
        TotalTimesHighJumped AS totalHighJumps,
        TotalTimesShotPut AS totalShotPuts,
        TotalTimesDiscusThrown AS totalDiscusThrows,
        TotalTimesJavelinThrown AS totalJavelinThrows,
        TotalTimesHammerThrown AS totalHammerThrows,
        TotalTimesPoleVaulted AS totalPoleVaults,
        TotalTimeRan AS totalTimeRan
      FROM AthleteProfile
      WHERE AthleteID = ? -- Use a parameter to specify the profile
    `, [req.params.id]); // Assuming req.params.id is the AthleteID
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTotalDistance = async (req, res) => {
  try {
    // Adjust the query to get aggregated data for a specific profile or criteria
    const [rows] = await db.query(`
      SELECT 
        TotalDistanceLongJumped AS totalDistanceLongJumped,
        TotalDistanceHighJumped AS totalDistanceHighJumped,
        TotalDistanceShotPut AS totalDistanceShotPut,
        TotalDistanceDiscusThrown AS totalDistanceDiscusThrown,
        TotalDistanceJavelinThrown AS totalDistanceJavelinThrown,
        TotalDistanceHammerThrown AS totalDistanceHammerThrown,
        TotalDistancePoleVaulted AS totalDistancePoleVaulted,
        TotalDistanceRan AS totalDistanceRan
      FROM AthleteProfile
      WHERE AthleteID = ? -- Use a parameter to specify the profile
    `, [req.params.id]); // Assuming req.params.id is the AthleteID
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
