import expressAsyncHandler from 'express-async-handler';
import { generateAccessToken } from '../utils/generateToken.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user._id);

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const refresh = expressAsyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id).exec();
    if (user) {
      const accessToken = generateAccessToken(user._id);
      res.json({ accessToken });
    } else {
      res.status(401);
      throw new Error('Unauthorized');
    }
  } catch (error) {
    res.status(403);
    throw new Error('Not authorized');
  }
});

export const logout = expressAsyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(204);
    throw new Error('Something went wrong');
  } else {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });
    res.json('Logged out successfully');
  }
});
