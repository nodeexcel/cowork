import userStore from "../data/user"
export default {
    Mutation: {
        create: async (_, { input: { email, password, name, phone } }) => {
            return await userStore.createUser(email, password, name, phone)
        },
        login: async (_, { email }) => {
            return await userStore.login(email)
        }
    },
    Query: {
        currentUser: async (_, { }, context) => {
            if (context.user) {
                return context.user
            } else {
                return null
            }
        },
        listUsers: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }
            if (context.isAdmin) {
                return await userStore.listUsers(input)
            }
            throw new Error("Only Admin User Allowed")
        },
        viewUser: async (_, { id }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }
            if (id !== context.user.id) {
                if (!context.isAdmin) {
                    throw new Error("Cannot View  Other Users Data")
                }
            }

            return await userStore.getUser("", id)
        }
    },
    User: {
        name: async (_) => {
            if (_.name) {
                return _.name
            } else {
                return await userStore.getUserName(_.id)
            }
        },
        role: async (_) => {
            if (_.role) {
                return _.role
            } else {
                return await userStore.getUserRole(_.id)
            }
        },
    }
}