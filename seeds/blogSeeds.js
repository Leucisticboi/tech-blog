const sequelize = require('../config/connection');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const postSeedData = require('./postSeedData.json');
const commentSeedData = require("./commentSeedData.json");
const userSeedData = require("./userSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userSeedData);

    await Post.bulkCreate(postSeedData);

    await Comment.bulkCreate(commentSeedData);

    process.exit(0);

};

seedDatabase();