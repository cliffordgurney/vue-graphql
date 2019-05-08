module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: "desc" })
        .populate({
          path: "createdBy",
          model: "User"
        });
      return posts;
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    },
    signupUser: async (
      _,
      { accountType, company, email, password, phone },
      { User },
      info
    ) => {
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error("User exists");
      }
      const newUser = await new User({
        accountType,
        company,
        email,
        password,
        phone
      }).save();
      return newUser;
    }
  }
};
