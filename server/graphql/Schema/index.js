let graphql = require("graphql");

module.exports = graphql.buildSchema(`
    type User{
        _id: ID!
        username:String!,
        password:String!
        role:String!
    }

    type LoginReturnType{
        token:String  
        id:ID 
        role:String
    }
    type MessageReturn{
        message:String 
        status:String  
    }

    type RootMutation{
        createUser(username:String!, password:String!, role:String!):MessageReturn!
        login(username:String!,password:String!):LoginReturnType!
    }
    type RootQuery{
        user(userId:String!):User!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
