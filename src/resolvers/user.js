import dataStore from "../data"
export default {
    Mutation: {
        create: async (_, { input: { email, password, name, phone } }) => {
            return dataStore.createUser(email, password, name, phone)
        },
        login: async (_, { email }) => {
            return dataStore.login(email)
        }
    },
    Query: {
        currentUser: async (_, { }, context) => {
            if (context.user) {
                return context.user
            } else {
                return null
            }
        }
    }
}