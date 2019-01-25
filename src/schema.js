import types from "./types/user"

import userQuery from "./queries/user"


import userMutation from "./mutations/user"
import teamMutation from "./mutations/team"

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
    types,
    userMutation,
    userQuery,
    teamMutation
]

export const resolvers = [userResolver]