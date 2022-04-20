let graphql = require("graphql");

module.exports = graphql.buildSchema(`
    scalar Date

    type User{
        _id: ID!
        username:String!,
        password:String!
        role:String!
    }

    type ClinicalVisit{
        _id: ID!
        bodyTemperature:Int!,
        heartRate:Int!
        bloodPressure:String!,
        respiratoryRate: Int!,
        nurse: ID,
        patient: ID
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
        createClinicalVisit(bodyTemperature:Int!, heartRate:Int!, bloodPressure:String!,respiratoryRate: Int!,nurse: String,patient: String):MessageReturn!
    }
    type RootQuery{
        user(userId:String!):User!
        findUserByRole(role:String!):[User]
        findClinicalVisitsByNurse(nurse:ID!):[ClinicalVisit]
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
