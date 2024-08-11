const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

// Controllers and Routes
const usersRoutes = require('./routes/usersRoutes');
const athleteProfileRoutes = require('./routes/athleteProfileRoutes');
const trainingSessionsRoutes = require('./routes/trainingSessionsRoutes');
const competitionsRoutes = require('./routes/competitionsRoutes');
const raceHistoryRoutes = require('./routes/raceHistoryRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const userAchievementsRoutes = require('./routes/userAchievementsRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const videoFeedbackRoutes = require('./routes/videoFeedbackRoutes');

const app = express();

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/athlete-profiles', athleteProfileRoutes);
app.use('/api/training-sessions', trainingSessionsRoutes);
app.use('/api/competitions', competitionsRoutes);
app.use('/api/race-history', raceHistoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user-achievements', userAchievementsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/video-feedback', videoFeedbackRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to StrideSync API!');
});

// Error handling middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
