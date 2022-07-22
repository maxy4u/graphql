var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Sample users
var users = [
    {
      id: 1,
      name: 'Brian',
      age: '21',
      shark: 'Great White Shark'
    },
    {
      id: 2,
      name: 'Kim',
      age: '22',
      shark: 'Whale Shark'
    },
    {
      id: 3,
      name: 'Faith',
      age: '23',
      shark: 'Hammerhead Shark'
    },
    {
      id: 4,
      name: 'Joseph',
      age: '23',
      shark: 'Tiger Shark'
    },
    {
      id: 5,
      name: 'Joy',
      age: '25',
      shark: 'Hammerhead Shark'
    }
  ];
  
  

// initialize GraphQL schema
const schema = buildSchema(`
    type Query {
        user(id: Int!): Person
        users(shark: String): [Person]
    },
    type Person {
        id: Int
        age: Int
        name: String
        shark: String
    },
    type Mutation {
      updateUser(id: Int!, name: String!, age: Int): Person
    }
`);

// Root Resolver

function getUser({id}){
    return users.filter(user => user.id === id)[0];
}

function retrieveUsers({shark}){
    return shark ? (users.filter(user => user.shark === shark )) : users ;
}

function updateUser({id, name, age}){
  users.map((user)=>{
    if (user.id === id){
      user.name = name;
      user.age = age;
    }
  });
  return users.filter(user => user.id === id )[0];
}
const root = {
    user: getUser, // Resolvers function to return user with specific id
    users: retrieveUsers,
    updateUser // Include Mutation function in root resolver.
}

// create an express server and a GraphQL endpoint

const app = express();
app.use('/graphql', graphqlHTTP({
    schema : schema, // required queries of types or mutations
    rootValue: root, // contains all resolver functions
    graphiql: true // enable graphiql when server endpoint is accessed in web browser
}));

app.listen(4000, ()=>console.log('browse to localhost:4000/graphql'));
