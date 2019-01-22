import dataStore from "../data"

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            return dataStore.login(username, password)
        }
    }
}