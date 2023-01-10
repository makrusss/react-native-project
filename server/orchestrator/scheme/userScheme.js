const axios = require("axios");
const redis = require("../helpers/redis");
const userUrl = "http://http://13.212.90.209:4001/users/";
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql

type User{
    username: String
    email: String
    role: String
    password: String
    phoneNumber: String
    address: String
}

input userInput{
  username: String
  email: String
  role: String
  password: String
  phoneNumber: String
  address: String
}

type Users{
  _id: String
  username: String
  email: String
  role: String
  password: String
  phoneNumber: String
  address: String
}

type Query {
  getUsers: [Users]
  getUserById(id: ID) : User
}

type Mutation {
    addUser(newUser: userInput) : User
    delUser(_id: String) : User
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const cache = await redis.get("users");
        if (cache) {
          return JSON.parse(cache);
        }
        let { data } = await axios.get(userUrl);
        await redis.set("users", JSON.stringify(data));
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    getUserById: async (_, args) => {
      try {
        const { id } = args;
        let { data } = await axios.get(userUrl + id);
        return data;
      } catch (error) {
        console.log(error, `error user by id`);
        throw new GraphQLError("Internal Server Error");
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios.post(userUrl, args.newUser);
        await redis.del("users");
        return { msg: "User has been added" };
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    delUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.delete(userUrl + _id);
        await redis.del("users");
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
  },
};

module.exports = { resolvers, typeDefs };
