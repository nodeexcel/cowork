import userType from "./types/user"
import userMutation from "./mutations/user"
import userQuery from "./queries/user"
import { gql } from 'apollo-server'
import userResolver from "./resolvers/user"


const queryType = gql`
type Query {
    _empty: String
}
`

const mutationType = gql`
type Mutation {
    _empty: String
}
`
export const typeDefs = [
    queryType,
    mutationType,
    userType,
    userMutation,
    userQuery
]

export const resolvers = [userResolver]