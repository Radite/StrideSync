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

exports.createSession = async (req, res) => {
  const {
    AthleteID,
    SessionDate,
    SessionType,
    EventDetails,
    IntensityPercentage,
    Notes,
    TotalDistanceHighJumped,
    TotalDistanceLongJumped,
    TotalDistancePoleVaulted,
    TotalDistanceShotPut,
    TotalDistanceDiscusThrown,
    TotalDistanceJavelinThrown,
    TotalDistanceHammerThrown,
    TotalDistanceTripleJumped,
    TotalDistanceRan,
    TotalTimeRan,
    NumberOfLongJumps,
    NumberOfHighJumps,
    NumberOfPoleVaults,
    NumberOfShotPuts,
    NumberOfDiscusThrows,
    NumberOfJavelinThrows,
    NumberOfHammerThrows,
    NumberOfTripleJumps
  } = req.body;

  const query = `
  INSERT INTO TrainingSessions 
  (AthleteID, SessionDate, SessionType, EventDetails, IntensityPercentage, Notes, 
  TotalDistanceHighJumped, TotalDistanceLongJumped, TotalDistancePoleVaulted, TotalDistanceShotPut, 
  TotalDistanceDiscusThrown, TotalDistanceJavelinThrown, TotalDistanceHammerThrown, TotalDistanceTripleJumped, 
  TotalDistanceRan, TotalTimeRan, NumberOfLongJumps, NumberOfHighJumps, NumberOfPoleVaults, NumberOfShotPuts, 
  NumberOfDiscusThrows, NumberOfJavelinThrows, NumberOfHammerThrows, NumberOfTripleJumps) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  AthleteID,
  SessionDate,
  SessionType,
  JSON.stringify(EventDetails),
  IntensityPercentage || 0,
  Notes || '',
  TotalDistanceHighJumped || 0,
  TotalDistanceLongJumped || 0,
  TotalDistancePoleVaulted || 0,
  TotalDistanceShotPut || 0,
  TotalDistanceDiscusThrown || 0,
  TotalDistanceJavelinThrown || 0,
  TotalDistanceHammerThrown || 0,
  TotalDistanceTripleJumped || 0,
  TotalDistanceRan || 0,
  TotalTimeRan || 0,
  NumberOfLongJumps || 0,
  NumberOfHighJumps || 0,
  NumberOfPoleVaults || 0,
  NumberOfShotPuts || 0,
  NumberOfDiscusThrows || 0,
  NumberOfJavelinThrows || 0,
  NumberOfHammerThrows || 0,
  NumberOfTripleJumps || 0
];

// Log number of placeholders and values
console.log('Number of Placeholders:', query.match(/\?/g)?.length || 0);
console.log('Number of Values:', values.length);


  try {
    const [result] = await db.query(query, values);
    res.status(201).json({ SessionID: result.insertId });
  } catch (err) {
    // Enhanced error logging
    console.error('SQL Error Message:', err.message);
    console.error('SQL Error Code:', err.code);
    console.error('SQL Query:', query);
    console.error('Values:', values);
    res.status(500).json({ 
      error: 'An error occurred while creating the session.',
      message: err.message,
      code: err.code,
      query: query,
      values: values
    });
  }
};

// Update a training session
exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const {
    AthleteID,
    SessionDate,
    SessionType,
    EventDetails,
    IntensityPercentage,
    Notes,
    TotalDistanceHighJumped,
    TotalDistanceLongJumped,
    TotalDistancePoleVaulted,
    TotalDistanceShotPut,
    TotalDistanceDiscusThrown,
    TotalDistanceJavelinThrown,
    TotalDistanceHammerThrown,
    TotalDistanceTripleJumped,
    TotalDistanceRan,
    TotalTimeRan,
    NumberOfLongJumps,
    NumberOfHighJumps,
    NumberOfPoleVaults,
    NumberOfShotPuts,
    NumberOfDiscusThrows,
    NumberOfJavelinThrows,
    NumberOfHammerThrows,
    NumberOfTripleJumps
  } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE TrainingSessions SET AthleteID = ?, SessionDate = ?, SessionType = ?, EventDetails = ?, IntensityPercentage = ?, Notes = ?, TotalDistanceHighJumped = ?, TotalDistanceLongJumped = ?, TotalDistancePoleVaulted = ?, TotalDistanceShotPut = ?, TotalDistanceDiscusThrown = ?, TotalDistanceJavelinThrown = ?, TotalDistanceHammerThrown = ?, TotalDistanceTripleJumped = ?, TotalDistanceRan = ?, TotalTimeRan = ?, NumberOfLongJumps = ?, NumberOfHighJumps = ?, NumberOfPoleVaults = ?, NumberOfShotPuts = ?, NumberOfDiscusThrows = ?, NumberOfJavelinThrows = ?, NumberOfHammerThrows = ?, NumberOfTripleJumps = ? WHERE SessionID = ?',
      [
        AthleteID,
        SessionDate,
        SessionType,
        JSON.stringify(EventDetails),
        IntensityPercentage,
        Notes,
        TotalDistanceHighJumped || 0,
        TotalDistanceLongJumped || 0,
        TotalDistancePoleVaulted || 0,
        TotalDistanceShotPut || 0,
        TotalDistanceDiscusThrown || 0,
        TotalDistanceJavelinThrown || 0,
        TotalDistanceHammerThrown || 0,
        TotalDistanceTripleJumped || 0,
        TotalDistanceRan || 0,
        TotalTimeRan || 0,
        NumberOfLongJumps || 0,
        NumberOfHighJumps || 0,
        NumberOfPoleVaults || 0,
        NumberOfShotPuts || 0,
        NumberOfDiscusThrows || 0,
        NumberOfJavelinThrows || 0,
        NumberOfHammerThrows || 0,
        NumberOfTripleJumps || 0,
        id
      ]
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

