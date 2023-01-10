const axios = require("axios");
const redis = require("../helpers/redis");
const userUrl = "http://13.212.90.209:4001/users/";
const appUrl = "http://13.212.90.209:4002/";
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql

type Product {
  id: ID
  name: String
  description: String
  slug: String
  price: Int
  mainImg: String
  stock: Int
  authorMongoId: String
  categoryId: Int
  Category: Category
  Images: [Images]
  user: User
}

type Products {
  id: ID
  name: String
  description: String
  slug: String
  price: Int
  mainImg: String
  stock: Int
  authorMongoId: String
  categoryId: Int
  Category: Category
  Images: [Images]
}

input productInput {
  name: String
  description: String
  price: Int
  stock: Int
  mainImg: String
  slug: String
  authorMongoId: String
  categoryId: Int
  ImageName: [ImagesInput]
}

input ImagesInput {
    imgUrl: String
}

type User{
    username: String
    email: String
    role: String
    password: String
    phoneNumber: String
    address: String
}



type Category {
    id: ID
    name:String
}

type Images {
    id: ID
    imgUrl: String
    productId: Int
}


type Query {
  getProducts: [Products]
  getProduct(id: ID): Product
}

type Mutation {
    addProduct(newProduct: productInput) : Product
    delProduct(id: ID) : Product
    editProduct(editedProduct: productInput, id: ID) : Product
  }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        console.log(`masuk product home`);
        const cache = await redis.get("products");
        if (cache) {
          return JSON.parse(cache);
        }
        let { data } = await axios.get(appUrl + "products");
        await redis.set("products", JSON.stringify(data));
        // console.log(data, `<<< data di home`);
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    getProduct: async (_, args) => {
      try {
        console.log(`masuk product detail`);
        console.log(args, `<<< args`);
        const { id } = args;
        let { data: product } = await axios.get(appUrl + "products/" + id);
        console.log(product);
        console.log(1);
        let { authorMongoId } = product;
        let { data: user } = await axios.get(userUrl + authorMongoId);
        console.log(2);
        const { password, ...newUser } = user;
        return { ...product, user: newUser };
      } catch (error) {
        console.log(error, `ERROR DETAIL`);
        throw new GraphQLError("Internal Server Error");
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { data } = await axios.post(appUrl + "products", args.newProduct);
        await redis.del("products");
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    delProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(appUrl + "products/" + id);
        await redis.del("products");
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    editProduct: async (_, args) => {
      try {
        const { id } = args;
        let { data } = await axios.put(
          appUrl + "products/" + id,
          args.editedProduct
        );
        await redis.del("products");
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
  },
};

module.exports = { resolvers, typeDefs };
