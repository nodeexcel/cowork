import dataStore from "../data"
import { container, datastore } from "google-proto-files";
export default {
    Mutation: {
        create: async (_, { input: { email, password, name, phone } }) => {
            return await dataStore.createUser(email, password, name, phone)
        },
        login: async (_, { email }) => {
            return await dataStore.login(email)
        },
        syncTeam: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }
            await dataStore.syncTeam(input)
            return input
        },
        signAgreement: async (_, { user_id, sign }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }

            return await dataStore.signAgreement(user_id, sign)
        },
        editTeam: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }
            if (input.user_id !== context.user.id) {
                if (!context.isAdmin) {
                    throw new Error("Cannot Edit Other Users Data")
                }
            }
            return await dataStore.editTeam(input)
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
                return await dataStore.listUsers(input)
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

            return await dataStore.getUser("", id)
        }
    },
    User: {
        team: async (_, { }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }
            if (context.user.team) {
                return context.user.team
            }
            if (_.id) {
                let team = await dataStore.getTeam(_.id)
                if (!team) {
                    return null
                }
                return team

            } else {
                return null
            }
        },
        name: async (_) => {
            if (_.name) {
                return _.name
            } else {
                return await dataStore.getUserName(_.id)
            }
        },
        role: async (_) => {
            if (_.role) {
                return _.role
            } else {
                return await dataStore.getUserRole(_.id)
            }
        },
    }
}