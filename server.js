var { graphql, buildSchema } = require('graphql');

// ******************* start for GraphiQL=GUI *******************
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
// ******************* end for GraphiQL *******************
const userData = require('./user.json');

let fakeDB = {}
let demoDB = [
  { id: '0', name: 'Jewel', rent: '$25' },
  { id: '1', name: 'Mahmud', rent: '$35' },
  { id: '2', name: 'Jahid', rent: '$45' },
]

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Person{
    id: Int
    name: String
    email: String
  }

  type Space{
    id: ID!
    name:String
    rent: String
  }

  type Query {
    users : [Person]
    user(id:Int, text:String) : Person
    getMsg: String
    getSpace(id:ID!): Space
    get_all_spaces: [Space]
  }

  input SpaceInput{
    name:String 
    rent:String
  }

  type Mutation {
    addMsg(msg: String): String
    addSpace(id:ID!, name:String, rent:String): Space!
    updateSpace(id:ID!, input:SpaceInput): Space!
  }
`);

// The rootValue provides a resolver function for each API endpoint
var root = {
  users: () => {
    return userData
  },

  user: ({ id, text }) => {
    console.log('===========', text)
    return userData.find(user => user.id == id)
  },

  addMsg: ({ msg }) => {
    return fakeDB.msg = msg  // ???
  },

  getMsg: () => {
    return fakeDB.msg
  },

  get_all_spaces:()=>{
    return demoDB
  },
  
  addSpace: ({id, name, rent}) =>{
    console.log('======', demoDB)
    return demoDB[demoDB.length]={id, name, rent}
  },

  getSpace: ({id})=>{
    console.log('======>', demoDB.find(space=>space.id===id))
    return demoDB.find(space=>space.id===id)
  },

  updateSpace: ({id,input})=>{
    return demoDB[id]={id:id, name:input.name, rent:input.rent}
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




