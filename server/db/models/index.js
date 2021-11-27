const User = require("./User");
const Animation = require("./Animation");

// associations

User.hasMany(Animation);

module.exports = {
  User,
  Animation
};
