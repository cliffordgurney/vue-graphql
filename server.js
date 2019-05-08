const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require('fs')
const path = require('path')
const resolvers = require('./resolvers.js')

const User = require("./models/User");
const Post = require("./models/Post");
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')

require("dotenv").config({
  path: ".env"
});



mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening`, url);
});
