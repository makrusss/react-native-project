const Users = require("../models/user");

class Controller {
  static async fetchUsers(req, res) {
    try {
      const data = await Users.getUsers();
      let users = data.map((el) => {
        delete el.password;
        return el;
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
  static async addUser(req, res) {
    try {
      const data = await Users.addUsers(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchUserById(req, res) {
    const { id } = req.params;
    try {
      const data = await Users.getUserById(id);
      const { password, ...newUser } = data;
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  static async delUserById(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Users.getUserById(id);
      await Users.deleteById(id);
      res.status(200).json({ msg: `${deleted.email} has been deleted` });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
