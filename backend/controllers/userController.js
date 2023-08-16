import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//@desc     Register User
//@route    POST /api/user
//@access   Public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.json({
      user,
    });
  }
});

//@desc     Get user profile
//@route    GET /api/user/profile
//@access   Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      cart: req.user.cart,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc     Update user profile
//@route    PUT /api/user/profile
//@access   Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/user/profile
// @access  Private
export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.remove();
    res.json({ message: 'Account deleted' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/user/:id
// @access  Private/Admin
export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
