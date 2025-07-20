// routes/users.js
import express from 'express';
import User from '../model/data.js'; // adjust the path if needed

const router = express.Router();

// GET /users - Retrieve all user data
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // get all users
    res.json(users); // send them as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Generate random points between 10 and 50
  const pointsToAdd = Math.floor(Math.random() * 41) + 10;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: pointsToAdd } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Points claimed successfully',
      updatedPoints: updatedUser.points,
      pointsAdded: pointsToAdd,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, points, avatar } = req.body;

    const newUser = new User({
      username,
      points,
      avatar
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server error while saving user' });
  }
});


export default router;
