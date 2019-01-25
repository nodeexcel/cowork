import { gql } from 'apollo-server'

export default gql`
enum Role {
    GUEST,
    ADMIN,
    MANAGER,
    COWORKER
}
type User {
    id: ID!,
    email: String!,
    role: Role!,
    token: String,
    phone: String!,
    name: String!
    team: Team
}
enum Plan {
    FIXEDMONTHLY,
    FLOATINGMONTHLY,
    DAILY,
    NIGHT PLAN
}
type Team {
    name: String!,
    rate: String!,
    no_of_seats: Int!,
    plan: Plan!,
    company_name: String,
    pan: String,
    id_proof: String,
    address: String,
    start_date: Int,
    duration: Int,
    seats_assigned: String,
    working_hours: String,
    existing_member: Boolean,
    is_signed: Boolean,
    signature: String
}

`

