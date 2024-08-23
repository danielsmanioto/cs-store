const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Funções auxiliares
const hashPassword = async (password) => await bcrypt.hash(password, 10);
const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET);

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ email, password: hashedPassword });
        const token = generateToken(newUser._id);

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = generateToken(user._id);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Demonstração de que as funções estão sendo exportadas corretamente.
console.log("Exporting functions:", { register: !!register, login: !!login });

exports.register = register;
exports.login = login;
