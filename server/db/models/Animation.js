const Sequelize = require("sequelize");
const db = require("../db");

/*
    Description: Model for Animation table
    Dependencies: Sequelize
    Priority: High
*/

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
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    }
})

module.exports = Animation;