const db = require('../db');

// Get all users
exports.getAllUsers = async (req, res) => {
  console.log('Incoming request to get all users');
  try {
    const [rows] = await db.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching all users:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(`Incoming request to get user with ID: ${id}`);
  try {
    const [rows] = await db.query('SELECT * FROM Users WHERE UserID = ?', [id]);
    if (rows.length === 0) {
      console.warn(`User with ID ${id} not found`);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error fetching user with ID ${id}:`, err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { Username, Email, PasswordHash, Name, ProfilePicURL, DateOfBirth, Gender, Height, Weight, AppleID, FacebookID, GoogleID } = req.body;
  
  console.log('Incoming request to create user with data:', {
    Username,
    Email,
    PasswordHash, // Remember not to log sensitive data in production
    Name,
    ProfilePicURL,
    DateOfBirth,
    Gender,
    Height,
    Weight,
    AppleID,
    FacebookID,
    GoogleID
  });

  try {
    // Check if username or email already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM Users WHERE Username = ? OR Email = ?',
      [Username, Email]
    );

    if (existingUsers.length > 0) {
      if (existingUsers.some(user => user.Username === Username)) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (existingUsers.some(user => user.Email === Email)) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Create new user
    const [result] = await db.query(
      'INSERT INTO Users (Username, Email, PasswordHash, Name, ProfilePicURL, DateOfBirth, Gender, Height, Weight, AppleID, FacebookID, GoogleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Username, Email, PasswordHash, Name, ProfilePicURL, DateOfBirth, Gender, Height, Weight, AppleID, FacebookID, GoogleID]
    );
    
    res.status(201).json({ UserID: result.insertId });
  } catch (err) {
    console.error('Error creating user:', err.message);

    // Handle specific database errors
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.sqlMessage.includes('Username')) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (err.sqlMessage.includes('Email')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // General error response
    res.status(500).json({ error: 'An error occurred while creating the account' });
  }
};


// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { Username, Email, PasswordHash, Name, ProfilePicURL, DateOfBirth, Gender, Height, Weight, AppleID, FacebookID, GoogleID } = req.body;
  console.log(`Incoming request to update user with ID ${id} with data:`, {
    Username,
    Email,
    PasswordHash, // Remember not to log sensitive data in production
    Name,
    ProfilePicURL,
    DateOfBirth,
    Gender,
    Height,
    Weight,
    AppleID,
    FacebookID,
    GoogleID
  });

  try {
    const [result] = await db.query(
      'UPDATE Users SET Username = ?, Email = ?, PasswordHash = ?, Name = ?, ProfilePicURL = ?, DateOfBirth = ?, Gender = ?, Height = ?, Weight = ?, AppleID = ?, FacebookID = ?, GoogleID = ? WHERE UserID = ?',
      [Username, Email, PasswordHash, Name, ProfilePicURL, DateOfBirth, Gender, Height, Weight, AppleID, FacebookID, GoogleID, id]
    );
    if (result.affectedRows === 0) {
      console.warn(`User with ID ${id} not found for update`);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(`Incoming request to delete user with ID ${id}`);
  try {
    const [result] = await db.query('DELETE FROM Users WHERE UserID = ?', [id]);
    if (result.affectedRows === 0) {
      console.warn(`User with ID ${id} not found for deletion`);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(`Error deleting user with ID ${id}:`, err.message);
    res.status(500).json({ error: err.message });
  }
};
