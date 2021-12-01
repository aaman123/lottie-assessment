const Sequelize = require("sequelize");
const db = require("../db");

/*
    Description: Model for User table
    Dependencies: Sequelize
    Priority: High
*/

const User = db.define("user", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      alloWNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
    },
    photoUrl: {
      type: Sequelize.STRING
    },
})

module.exports = User;