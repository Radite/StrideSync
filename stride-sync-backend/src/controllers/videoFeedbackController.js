// controllers/videoFeedbackController.js

const db = require('../db'); // Import your database connection

// Create a new video feedback
exports.createVideoFeedback = async (req, res) => {
    const { AthleteID, VideoURL, Feedback } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO VideoFeedback (AthleteID, VideoURL, Feedback) VALUES ($1, $2, $3) RETURNING *',
            [AthleteID, VideoURL, Feedback]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all video feedback
exports.getAllVideoFeedbacks = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM VideoFeedback');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific video feedback by ID
exports.getVideoFeedbackById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM VideoFeedback WHERE VideoID = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Video feedback not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a specific video feedback by ID
exports.updateVideoFeedbackById = async (req, res) => {
    const { id } = req.params;
    const { VideoURL, Feedback } = req.body;
    try {
        const result = await db.query(
            'UPDATE VideoFeedback SET VideoURL = $1, Feedback = $2, UpdatedAt = CURRENT_TIMESTAMP WHERE VideoID = $3 RETURNING *',
            [VideoURL, Feedback, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Video feedback not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a specific video feedback by ID
exports.deleteVideoFeedbackById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM VideoFeedback WHERE VideoID = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Video feedback deleted successfully' });
        } else {
            res.status(404).json({ message: 'Video feedback not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
