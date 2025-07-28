// routes/devoteeRoutes.js
const express = require('express');
const devoteeController = require('../controllers/devoteeController');
const { protect, devoteeOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes (no authentication required)
router.get('/priests', devoteeController.searchPriests);
router.get('/priests/:priestId', devoteeController.getPriestDetails);

// Protected routes (need authentication and devotee role)
router.post('/bookings', protect, devoteeOnly, devoteeController.createBooking);

// Add devotee profile update route
router.put('/profile', protect, devoteeOnly, devoteeController.updateProfile);

module.exports = router;