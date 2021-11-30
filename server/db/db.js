const Sequelize = require("sequelize");
const dotenv = require('dotenv');

/*
    Description: Database Connection Configuration.
    Dependencies: Sequelize, dotenv.
    Priority: High
*/

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/lottie_assessment", {
  logging: false
});

module.exports = db;
