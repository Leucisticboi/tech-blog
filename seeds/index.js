const sequelize = require('../config/connection');
const seedUsers = require('./UserSeeds');
const seedPosts = require('./PostSeeds');
const seedComments = require('./CommentSeeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();