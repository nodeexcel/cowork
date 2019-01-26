import { gql } from 'apollo-server'

export default gql`
input PlanCreateFields{
    name: String!,
    cost: String!,
    duration: Int!,
    details: String
}
input PlanUpdateFields{
    id: ID!,
    name: String,
    cost: String,
    duration: Int,
    details: String
}
extend type Mutation {
    addPlan(input: PlanCreateFields) : Plan,
    updatePlan(input: PlanUpdateFields) : ID,
    deletePlan(id: ID): ID
}
`