import jwt from 'jsonwebtoken';

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

// export const generateRefreshToken = (id) => {
//   return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: '7d',
//   });
// };
