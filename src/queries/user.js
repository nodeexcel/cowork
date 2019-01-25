import { gql } from 'apollo-server'

export default gql`
type ListUsers {
    users: [User],
    nextPageToken: String
}
extend type Query {
    currentUser : User,
    listUsers(nextPageToken: String): ListUsers,
    viewUser(id: ID!): User
}
`