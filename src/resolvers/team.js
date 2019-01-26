import teamStore from "../data/team"
export default {
    Mutation: {
        syncTeam: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }
            await teamStore.syncTeam(input)
            return input
        },
        signAgreement: async (_, { user_id, sign }, context) => {
            if (!context.user) {
                throw new Error("Unauthorized")
            }

            return await teamStore.signAgreement(user_id, sign)
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
            return await teamStore.editTeam(input)
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
                let team = await teamStore.getTeam(_.id)
                if (!team) {
                    return null
                }
                return team

            } else {
                return null
            }
        }
    }
}