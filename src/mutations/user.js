import { gql } from 'apollo-server'

export default gql`
extend type Mutation {
    login(username: String, password: String) : User
}
`