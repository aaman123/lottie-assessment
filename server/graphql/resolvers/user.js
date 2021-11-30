const { User } = require('../../db/models/User');

module.exports = {
    Mutation: {
      async register(root, args, context) {
        const { username, email, photoUrl } = args.input;
        return User.create({ username, email, photoUrl });
      },
    },
  };
  
