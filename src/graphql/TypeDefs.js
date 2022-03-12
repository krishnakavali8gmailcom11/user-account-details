import { gql } from 'apollo-server';

export default gql`
    type Bank {
        _id: String!
        name: String!
        branch: String!
        city: String!
        weather: String!
    }

    type Account {
        _id: String
        ifsc: String
        number: String
        bank: Bank
    }

    type User {
        _id: String!
        name: String!
        accounts: [Account]
    }

    type Query {
        getUsers: [User]
    }

    input BankDetails {
        ifsc: String!
        number: Int!
    }

    input Details {
        data: [BankDetails]
    }

    input ReqUser {
        name: String!
        accounts: Details
    }

    type Mutation {
        addUser(object: ReqUser): User!
    }
`;