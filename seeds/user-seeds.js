const { User } = require('../models/index.js');

const userData = [
  {
    username: "example1",
    email: "example1@example.com",
    password: "example1",
  },
  {
    username: "example2",
    email: "example2@example.com",
    password: "example2"
  },
  {
    username: "example3",
    email: "example3@example.com",
    password: "example3"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;