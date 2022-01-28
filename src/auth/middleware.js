import jwt from 'jsonwebtoken';
import UserModel from '../user/model.js';

const userModel = new UserModel();

function authenticateToken(req, res, next) {
  if (!req.headers['authorization'])
    return res
      .status(401)
      .json({ error: "Authorization token wasn't provided" });

  const auth = req.headers['authorization'].split(' ');
  const authType = auth[0];
  const authToken = auth[1];

  try {
    if (authType !== 'Bearer')
      return res.status(401).json({ error: 'Wrong authorization token type' });

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) throw new Error(error.message);

      req.user = decoded;
    });

    next();
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
}

async function isEmailUnique(req, res, next) {
  const email = req.body.email;

  const user = await userModel.get(email);

  if (user)
    return res
      .status(409)
      .json({ error: 'User with this email is already exists' });

  next();
}

export { authenticateToken, isEmailUnique };
