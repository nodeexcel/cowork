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
    username: String!,
    role: Role!,
    token: String
}`

