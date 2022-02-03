import jwt from 'jsonwebtoken';
import Joi from 'joi';
import UserModel from '../user/model.js';
import { validateRequest } from '../middleware.js';

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

      res.locals.user = decoded;
    });

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
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

function loginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  validateRequest(req, res, next, schema);
}

function registrationValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  validateRequest(req, res, next, schema);
}

export {
  authenticateToken,
  isEmailUnique,
  loginValidation,
  registrationValidation,
};
