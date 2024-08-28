const User = require('../models/User');
const fs = require('fs');
const path = require('path')
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
                // Check if user already has an image 
                if (user.image) {
                    const oldImagePath = path.join(__dirname, '..', user.image);
                    // console.log(oldImagePath)

                    // Delete the old image file 
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error("Failed to delete old image: ", err);
                        } else {
                            console.log("Old image deleted successfully :-)");
                        }
                    })
                }

                // Save the new image 
                const imagePath = `/uploads/${req.file.filename}`; // URL path to the image
                user.image = imagePath; // Save the URL path in MongoDB
                // console.log("userController -> updateUserProfile: ", user.image);
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            // Check if there is an image update 
            const userImage = updatedUser.image && `${process.env.BACKEND_URL}${updatedUser.image}`;
            // console.log("userController -> updateUserProfile: ", userImage ?? "No Image");
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                image: userImage ? userImage : null, // Include image URL
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
