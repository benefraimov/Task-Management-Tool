const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;


            // Handle image upload
            if (req.file) {
                const imagePath = `/uploads/${req.file.filename}`; // URL path to the image
                user.image = imagePath; // Save the URL path in MongoDB
                console.log("userController -> updateUserProfile: ", user.image);
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                image: `http://localhost:5000${updatedUser.image}`, // Include image URL
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, updateUserProfile };
