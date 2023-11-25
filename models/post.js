// Import the Sequelize constructor and DataTypes from the library
const { Model, DataTypes } = require('sequelize');
// Import the database connection from config.js
const sequelize = require('../config/connection');

// Define a new Sequelize model for Post
class Post extends Model {};

// Set up fields and rules for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 75],
      },
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1500],
      },
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'username',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Export Post model
module.exports = Post;