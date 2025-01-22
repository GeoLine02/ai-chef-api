// config/database.js
require("dotenv").config(); // Load environment variables from .env file
const { Sequelize } = require("sequelize");

// Get the values from the environment variables
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Configure Sequelize using environment variables
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

module.exports = sequelize;
