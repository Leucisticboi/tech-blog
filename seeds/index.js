const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds.js');
const seedPosts = require('./post-seeds.js');
const seedComments = require('./comment-seeds.js');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();