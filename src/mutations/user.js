import { gql } from 'apollo-server'

export default gql`
input UserCreateFields {
    email: String!, password: String!, name: String!, phone: String!
}
type Token {
    token: String!
}
extend type Mutation {
    create(input: UserCreateFields) : User,
    login(email: String!): String!
    
}
`