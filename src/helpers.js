import jwt from 'jsonwebtoken';

function jwtTokens({ id, name, email }) {
  const user = { id, name, email };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15s', // small value to check if refresh token is working correct
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  return { accessToken, refreshToken };
}

export { jwtTokens };
