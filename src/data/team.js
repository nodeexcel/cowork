import admin from "firebase-admin";

export default {
    getTeam: async (user_id) => {

        let db = admin.database();
        let ref = db.ref("cowork");
        let plan = ref.child("users/" + user_id + "/plan")
        let snapshot = await plan.once("value")
        plan = snapshot.val()


        if (plan) {
            let details = ref.child("users/" + user_id + "/details")
            snapshot = await details.once("value")
            details = snapshot.val()
            return {
                ...plan,
                ...details
            }
        } else {
            return false
        }
    },
    syncTeam: async ({
        user_id,
        name,
        rate,
        no_of_seats,
        plan,
        company_name,
        pan,
        id_proof,
        address,
        start_date,
        duration,
        seats_assigned,
        working_hours,
        existing_member
    }) => {
        let db = admin.database();
        let ref = db.ref("cowork");

        await ref.child("users/" + user_id + "/plan").set({
            name: name,
            rate: rate,
            no_of_seats: no_of_seats,
            plan: plan,
            is_signed: false
        })
        await ref.child("users/" + user_id + "/details").set({
            company_name: company_name ? company_name : "",
            pan: pan ? pan : "",
            id_proof: id_proof ? id_proof : "",
            address: address ? address : "",
            start_date: start_date ? start_date : "",
            duration: duration ? duration : "",
            seats_assigned: seats_assigned ? seats_assigned : "",
            working_hours: working_hours ? working_hours : "",
            existing_member: existing_member ? existing_member : ""
        })

        return ""
    },
    signAgreement: async (user_id, sign) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        return await ref.child("users/" + user_id + "/plan").update({
            signature: sign,
            is_signed: true
        })
    },
    editTeam: async (input = {
        user_id,
        name,
        rate,
        no_of_seats,
        plan,
        company_name,
        pan,
        id_proof,
        address,
        start_date,
        duration,
        seats_assigned,
        working_hours,
        existing_member
    }) => {
        let db = admin.database();
        let user_id = input.user_id

        delete input.user_id

        let ref = db.ref("cowork");
        await ref.child("users/" + user_id + "/plan").update({
            ...input
        })

        await ref.child("users/" + user_id + "/details").update({
            ...input
        })
    }
}