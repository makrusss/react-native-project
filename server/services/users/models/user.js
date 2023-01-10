const { getDatabase } = require("../config/mongoConnect");
const { ObjectId } = require("mongodb");

class Users {
  static async getCollection() {
    try {
      const database = await getDatabase();
      const users = database.collection("Users");
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsers() {
    try {
      const collection = await this.getCollection();
      const users = await collection.find().toArray();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async addUsers(payload) {
    try {
      const collection = await this.getCollection();
      const users = await collection.insertOne(payload);
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(id) {
    try {
      const collection = await this.getCollection();
      const users = await collection.findOne({ _id: ObjectId(id) });
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteById(id) {
    try {
      const collection = await this.getCollection();
      const users = await collection.deleteOne({ _id: ObjectId(id) });
      return users;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Users;
