const Redis = require("ioredis");

const redis = new Redis({
  //Markus-free-db
  port: 10341,
  host: "redis-10341.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "pbASbFT0pIyL3wrUgZYVzC55tLX5u6IT",
});

module.exports = redis;
