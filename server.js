const express = require('express');const graphqlHTTP = require('express-graphql');const { buildSchema } = require('graphql');const app = express();const port = process.env.PORT || 4000;// Mocked dataconst users = [  {    id: 1,    name: 'Brian',    age: '21',    gender: 'M'  },  {    id: 2,    name: 'Kim',    age: '22',    gender: 'M'  },  {    id: 3,    name: 'Joseph',    age: '23',    gender: 'M'  },  {    id: 4,    name: 'Fred',    age: '25',    gender: 'F'  },];const getUser = (args) => {  const userID = args.id;  return users.filter(user => {    return user.id === userID;  })[0];};const retrieveUsers = (args) => {  if(args.gender) {    const gender = args.gender;    return users.filter(user => user.gender === gender);  } else {    return users;  }};const updateUser = ({id, name, age}) => {  users.map(user => {    if(user.id === id) {      user.name = name;      user.age = age;      return user;    }  });  return users.filter(user => user.id === id) [0];};const rootResolver = {  user: getUser, // query  users: retrieveUsers, // query  updateUser: updateUser // mutation};const schema = buildSchema(`  type Query {    user(id: Int!): User    users(gender: String): [User]  },  type Mutation {    updateUser(id: Int!, name: String!, age: String): User  },  type User {    id: Int    name: String    age: Int    gender: String      }`);app.use('/graphql', graphqlHTTP({  schema: schema,  rootValue: rootResolver,  graphiql: true}));app.listen(port, () => console.log(`Server up on port: ${port} (open GraphiQL)`));