// routes/priestRoutes.js
const express = require('express');
const priestController = require('../controllers/priestController');
const { protect, priestOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// All priest routes need authentication and priest role
router.use(protect);
router.use(priestOnly);

// Profile routes
router.put('/profile', priestController.updateProfile);
router.get('/profile', priestController.getProfile);

// Booking routes
router.get('/bookings', priestController.getBookings);

// Earnings routes
router.get('/earnings', priestController.getEarnings);

module.exports = router;
