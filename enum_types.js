var { graphql, buildSchema } = require('graphql');

// ******************* start for GraphiQL=GUI *******************
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
// ******************* end for GraphiQL *******************
const userData = require('./user.json');

let demoDB = [
  { id: '0', name: 'Jewel', rent: '$25', status: "available" },
  { id: '1', name: 'Mahmud', rent: '$35', status: "not_available" },
  { id: '2', name: 'Jahid', rent: '$45', status: "available" },
]


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Space{
        id: ID!
        name: String
        rent: String
        status: status_for_space
    }

    enum status_for_space{
      available
      not_available
    }

    type Query{
        get_all_spaces: [Space]
    }

    type Mutation{
        add_spaces(id:ID!, name:String, rent:String, status:status_for_space): Space
    }
`);

// The rootValue provides a resolver function for each API endpoint
var root = {
    get_all_spaces:()=>{
        return demoDB
      },
    
      add_spaces:({id, name, rent, status})=>{
        return demoDB[demoDB.length]={id, name, rent, status}
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