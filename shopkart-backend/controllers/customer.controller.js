import Customer from '../models/customer.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. Register Controller
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const existingEmail = await Customer.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'An account with this Email already exists.' });
    }

    const existingPhone = await Customer.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return res.status(400).json({ success: false, message: 'An account with this Phone Number already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = new Customer({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim()
    });

    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful! You can now log in.'
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const fieldName = field === 'email' ? 'Email' : field === 'phone' ? 'Phone Number' : field;
      return res.status(400).json({
        success: false,
        message: `An account with this ${fieldName} already exists.`
      });
    }
    return res.status(500).json({ success: false, message: error.message || 'Server error during registration.' });
  }
};

// 2. Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const customer = await Customer.findOne({ email: email.toLowerCase().trim() });
    if (!customer) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '7d'
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userPayload = {
      _id: customer._id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone
    };

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: userPayload
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error during login.' });
  }
};

// 3. Logout Controller
export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get My Profile Controller
export const getMyProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user._id).select('-password');
    return res.status(200).json({ success: true, user: customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Change Password Controller
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const customer = await Customer.findById(req.user._id);

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, customer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(newPassword, salt);
    await customer.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- ALIASED EXPORTS FOR COMPATIBILITY ---
export const loginCustomer = login;
export const registerCustomer = register;
export const logoutCustomer = logout;
export const getProfile = getMyProfile;