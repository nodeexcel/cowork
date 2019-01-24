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
}`

