import bcrypt from 'bcrypt';
import UserModel from './model.js';

const userModel = new UserModel();

class UserController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(req, res) {
    try {
      const users = await userModel.getAll();

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const name = req.body.name.toString();
      const email = req.body.email.toString();
      const password = req.body.password.toString();

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await userModel.create(name, email, hashedPassword);

      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
