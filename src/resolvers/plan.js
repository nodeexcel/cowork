import planStore from "../data/plan"

export default {
    Mutation: {
        addPlan: async (_, { input }, context) => {
            if (!context.isAdmin) {
                throw new Error("Only Admin User Allowed")
            }
            return planStore.addPlan(input)
        },
        updatePlan: async (_, { input }, context) => {
            if (!context.isAdmin) {
                throw new Error("Only Admin User Allowed")
            }
            return planStore.updatePlan(input)
        },
        deletePlan: async (_, { id }, context) => {
            if (!context.isAdmin) {
                throw new Error("Only Admin User Allowed")
            }
            return planStore.deletePlan(id)
        },
    },
    Query: {
        viewPlans: async (_, { }, context) => {
            if (!context.isAdmin) {
                throw new Error("Only Admin User Allowed")
            }
            return await planStore.viewPlans()
        }
    }
}