const User = require('../models/signupmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// hasing Password funtion
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
const JWT_SECRET = 'your_jwt_secret_key';
// Function to create a new user
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already used' });
        }

        // Hash the user's password
        const hashedPassword = await hashPassword(password);

        // Create a new user instance
        const newUser = new User({
            email: email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


//  compare password function
const comparePasswords = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

// Function to log in a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const tokenPayload = {
            userId: user._id,
            email: user.email,
            // Add other relevant user information if needed
        };
        const token = jwt.sign(tokenPayload, "JWT_SECRET");
        
        res.json({ 
            success: true, 
            message: 'Login successful', 
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};