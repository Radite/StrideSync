const db = require('../db');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Notifications');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a notification by ID
exports.getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Notifications WHERE NotificationID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Notification not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new notification
exports.createNotification = async (req, res) => {
  const { UserID, NotificationDate, NotificationType, Message, ReadStatus } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Notifications (UserID, NotificationDate, NotificationType, Message, ReadStatus) VALUES (?, ?, ?, ?, ?)',
      [UserID, NotificationDate, NotificationType, Message, ReadStatus]
    );
    res.status(201).json({ NotificationID: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a notification
exports.updateNotification = async (req, res) => {
  const { id } = req.params;
  const { UserID, NotificationDate, NotificationType, Message, ReadStatus } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Notifications SET UserID = ?, NotificationDate = ?, NotificationType = ?, Message = ?, ReadStatus = ? WHERE NotificationID = ?',
      [UserID, NotificationDate, NotificationType, Message, ReadStatus, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Notification not found' });
    res.json({ message: 'Notification updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM Notifications WHERE NotificationID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Notification not found' });
    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
