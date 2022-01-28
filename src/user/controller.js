import UserModel from './model.js';

const userModel = new UserModel();

class UserController {
  constructor() {
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req, res) {
    try {
      const users = await userModel.getAll();

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
