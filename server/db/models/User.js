const Sequelize = require("sequelize");
const db = require("../db");

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
      unique: true,
      allowNull: false
    },
    photoUrl: {
      type: Sequelize.STRING
    },
})

module.exports = User;