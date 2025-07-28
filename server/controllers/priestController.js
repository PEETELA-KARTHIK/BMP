// controllers/priestController.js
const PriestProfile = require('../models/priestProfile');
const User = require('../models/user');
const Booking = require('../models/booking');
const Transaction = require('../models/transaction');

// Create or update priest profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      experience,
      religiousTradition,
      templesAffiliated,
      ceremonies,
      description,
      profilePicture,
    } = req.body;

    // Find existing profile
    let profile = await PriestProfile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await PriestProfile.findOneAndUpdate(
        { userId: req.user.id },
        {
          experience,
          religiousTradition,
          templesAffiliated,
          ceremonies,
          description,
          profilePicture,
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = new PriestProfile({
        userId: req.user.id,
        experience,
        religiousTradition,
        templesAffiliated,
        ceremonies,
        description,
        profilePicture,
      });

      await profile.save();

      // Update user's profileCompleted status
      await User.findByIdAndUpdate(
        req.user.id,
        { profileCompleted: true }
      );
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Update priest profile error:', error);
    res.status(500).json({
      message: 'Server error while updating priest profile'
    });
  }
};

// Get priest profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await PriestProfile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Get priest profile error:', error);
    res.status(500).json({
      message: 'Server error while fetching priest profile'
    });
  }
};

// Get priest's bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      priestId: req.user.id,
    }).sort({ date: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      message: 'Server error while fetching bookings'
    });
  }
};

// Demo function to get earnings (simplified for testing)
exports.getEarnings = async (req, res) => {
  try {
    // Demo data
    const earnings = {
      thisMonth: 24500,
      lastMonth: 22000,
      growthPercentage: 12,
      availableBalance: 12300,
      transactions: [
        {
          id: '1',
          amount: 15000,
          type: 'earnings',
          date: new Date('2023-11-15'),
          description: 'Grih Pravesh Ceremony',
          client: 'Sharma Family',
        },
        {
          id: '2',
          amount: 11000,
          type: 'earnings',
          date: new Date('2023-11-12'),
          description: 'Satyanarayan Katha',
          client: 'Gupta Family',
        }
      ]
    };

    res.status(200).json(earnings);
  } catch (error) {
    console.error('Get earnings error:', error);
    res.status(500).json({
      message: 'Server error while fetching earnings'
    });
  }
};
