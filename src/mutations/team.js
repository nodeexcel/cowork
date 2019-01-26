import { gql } from 'apollo-server'

export default gql`
input TeamCreateFields {
    user_id: ID!,
    name: String!,
    rate: String!,
    no_of_seats: Int!,
    plan: String!,
    company_name: String,
    pan: String,
    id_proof: String,
    address: String,
    start_date: Int,
    duration: Int,
    seats_assigned: String,
    working_hours: String,
    existing_member: Boolean
}
extend type Mutation {
    syncTeam(input: TeamCreateFields) : Team,
    signAgreement(
        user_id: ID!,
        sign: String!
    ): String,
    editTeam(input: TeamCreateFields): Team
}
`