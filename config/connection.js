const { Sequelize } = require('sequelize');

// Create a connection to the database using Sequelize and dotenv modularization
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

// Export the connection
module.exports = sequelize;