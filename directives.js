var { graphql, buildSchema } = require('graphql');

// ******************* start for GraphiQL=GUI *******************
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
// ******************* end for GraphiQL *******************
const petData = require('./pet.json');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Pet{
        id: Int
        name: String
        pet: String
        pet_name: String
    }

    type Query{
        all_pet: [Pet]
    }
`);

// The rootValue provides a resolver function for each API endpoint

var root = {
    all_pet: () =>{
        return petData
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