const Sequelize = require("sequelize");
const db = require("../db");

const Animation = db.define('animation', {
    email: {
        type: Sequelize.STRING,
        unique: false,
        alloWNull: false,
        validate: {
            isEmail: true
      }
    },
    animationJson: {
        type: Sequelize.JSON(65536),
        allowNull: false
    }
})

module.exports = Animation;