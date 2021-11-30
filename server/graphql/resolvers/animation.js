const { Animation } = require('../../db/models/User');

module.exports = {
    Mutation: {
        async createAnimation(root, args, context) {
            const { email , animationJson, tags } = args.input;
            return User.create({ email , animationJson, tags });
          },
    },

    Query: {
      async getAllAnimations(_, { email }, context) {
        return Animation.findAll({ where: { email: email}});
      },
  
    },
  };
  
