import admin from "firebase-admin";

export default {
    addPlan: async (input) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        let plans = ref.child("plans").push(input)
        input.id = await plans.key
        return input
    },
    viewPlans: async () => {
        let db = admin.database();
        let ref = db.ref("cowork");
        let plans = ref.child("plans")
        plans = await plans.orderByValue().once("value")
        let valueMap = []
        plans.forEach((plan) => {
            valueMap.push({
                id: plan.key,
                ...plan.val()
            })
        })
        return valueMap
    },
    deletePlan: async (id) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        await ref.child("plans/" + id).set(null)
        return id
    },
    updatePlan: async ({ id, ...data }) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        await ref.child("plans/" + id).update(data)
        return id
    }
}