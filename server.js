var { graphql, buildSchema } = require('graphql');

// ******************* start for GraphiQL=GUI *******************
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
// ******************* end for GraphiQL *******************
const userData = require('./user.json');

let fakeDB = {}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Person{
    id: Int
    name: String
    email: String
  }

  type Query {
    users : [Person]
    user(id:Int, text:String) : Person
    getMsg: String
  }

  type Mutation {
    addMsg(msg: String): String
  }
`);

// The rootValue provides a resolver function for each API endpoint
var root = {
  users: () => {
    return userData
  },

  user: ({id, text})=>{
    console.log('===========', text)
    return userData.find(user=>user.id===id)
  },

  addMsg:({msg})=>{
    return fakeDB.msg = msg  // ???
  },
  
  getMsg:()=>{
    return fakeDB.msg
  }

};

// ******************* start for GraphiQL=GUI *******************
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
// ******************* End for GraphiQL *******************

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: '{name, email }',
//   rootValue
// }).then((response) => {
//   console.log(response);
// });



