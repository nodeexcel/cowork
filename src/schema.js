import { gql } from 'apollo-server'


import types from "./types"

import userQuery from "./queries/user"
import planQuery from "./queries/plan"


import userMutation from "./mutations/user"
import teamMutation from "./mutations/team"
import planMutation from "./mutations/plan"

import userResolver from "./resolvers/user"
import planResolver from "./resolvers/plan"


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
    teamMutation,
    planMutation,
    planQuery
]

export const resolvers = [userResolver, planResolver]