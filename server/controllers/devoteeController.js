// controllers/devoteeController.js
const User = require('../models/user');
const PriestProfile = require('../models/priestProfile');
const Booking = require('../models/booking');

// Search for priests
exports.searchPriests = async (req, res) => {
  try {
    const { ceremony, city, date, page = 1, limit = 10 } = req.query;
    
    // Build query filter
    const filter = {};
    
    if (ceremony) {
      filter.ceremonies = { $in: [ceremony] };
    }
    
    if (city) {
      filter['location.city'] = new RegExp(city, 'i');
    }
    
    // Get priest profiles with user details
    const priests = await PriestProfile.find(filter)
      .populate('userId', 'name email phone location')
      .sort({ 'ratings.average': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    // Filter out priests who are not verified
    const verifiedPriests = priests.filter(priest => priest.isVerified);
    
    // Format response
    const formattedPriests = verifiedPriests.map(priest => ({
      _id: priest._id,
      name: priest.userId.name,
      email: priest.userId.email,
      phone: priest.userId.phone,
      experience: priest.experience,
      religiousTradition: priest.religiousTradition,
      ceremonies: priest.ceremonies,
      profilePicture: priest.profilePicture,
      ratings: priest.ratings,
      ceremonyCount: priest.ceremonyCount,
      location: priest.userId.location,
      priceList: priest.priceList,
      isVerified: priest.isVerified,
    }));
    
    res.status(200).json({
      priests: formattedPriests,
      currentPage: page,
      totalPages: Math.ceil(verifiedPriests.length / limit),
      totalPriests: verifiedPriests.length,
    });
  } catch (error) {
    console.error('Search priests error:', error);
    res.status(500).json({
      message: 'Server error while searching for priests'
    });
  }
};

// Get priest details
exports.getPriestDetails = async (req, res) => {
  try {
    const { priestId } = req.params;

    // Demo data for testing
    const priest = {
      _id: priestId,
      name: 'Dr. Rajesh Sharma',
      experience: 25,
      religiousTradition: 'Hinduism',
      templesAffiliated: [{
        name: 'Shri Siddhivinayak Temple',
        address: 'Mumbai, Maharashtra'
      }],
      ceremonies: ['Wedding', 'Grih Pravesh', 'Baby Naming', 'Satyanarayan Katha'],
      description: 'With 25 years of experience, I specialize in conducting various religious ceremonies with precision and devotion.',
      profilePicture: '',
      ratings: {
        average: 4.9,
        count: 120
      },
      availability: 'available',
      priceList: {
        'Wedding': 15000,
        'Grih Pravesh': 8000,
        'Baby Naming': 5000,
        'Satyanarayan Katha': 11000,
        'default': 8000
      },
      ceremonyCount: 200
    };

    res.status(200).json(priest);
  } catch (error) {
    console.error('Get priest details error:', error);
    res.status(500).json({
      message: 'Server error while fetching priest details'
    });
  }
};

// Create a booking (simplified)
exports.createBooking = async (req, res) => {
  try {
    // Demo response
    const booking = {
      _id: Math.random().toString(36).substring(2, 10),
      ...req.body,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date()
    };

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      message: 'Server error while creating booking'
    });
  }
};

// Update devotee profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    // Add more fields as needed
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Update devotee profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};