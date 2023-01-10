const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://makrusss:DGGx6LPa7ia3Qsd@cluster0.vk8nk9c.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

let db;

async function mongoConnect() {
  try {
    const database = client.db("p3-c2");
    db = database;
    console.log("Connected successfully to server");
    return database;
  } catch (err) {
    console.log(err);
  }
}

function getDatabase() {
  return db;
}

module.exports = { mongoConnect, getDatabase };
