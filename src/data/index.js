
import admin from "firebase-admin";
import jwt from "jsonwebtoken"

export default {
    getUser: async (token, uid = false) => {
        let user = null
        if (!uid) {
            user = jwt.verify(token, process.env.secretKey)
            if (!user.uid) {
                return false
            }
            uid = user.uid
        }
        user = await admin.auth().getUser(uid)
        user.id = user.uid

        let db = admin.database();
        let ref = db.ref("cowork");
        let profile = ref.child("users/" + user.id)
        let snapshot = await profile.once("value")

        let snap = snapshot.val()

        user.name = snap.name
        user.role = snap.role
        if (snap.plan) {
            user.team = {}
            user.team = { ...snap.plan }

            if (snap.details) {
                user.team = { ...snap.details, ...snap.plan }
            }
        }
        return user

    },
    createUser: async (email, password, name, phone) => {

        let user = await admin.auth().createUser({
            email: email,
            emailVerified: true,
            phoneNumber: phone,
            password: password,
            disabled: false
        })
        user.id = user.uid
        // user.token = await admin.auth().createCustomToken(user.uid)
        user.phone = user.phoneNumber

        let db = admin.database();
        let ref = db.ref("cowork");
        await ref.child("users/" + user.id).set({
            role: "GUEST",
            name: name
        })
        user.role = "GUEST"
        user.name = name
        return user

    },
    login: async (email) => {
        //this is for admin's only i.e login without password
        let user = await admin.auth().getUserByEmail(email)
        if (user.uid) {
            return jwt.sign(user.toJSON(), process.env.secretKey);  //replace with private key later on
        } else {
            throw new Error("User Not Exist!")
        }
    },
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
    listUsers: async (nextPage = null) => {
        let users = null
        if (!nextPage)
            users = await admin.auth().listUsers(1000)
        else
            users = await admin.auth().listUsers(1000, nextPage)

        users.users = users.users.map((user) => {
            user = user.toJSON()
            user.id = user.uid
            return user
        })
        return users
    },
    getUserName: async (user_id) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        let profile = ref.child("users/" + user_id)
        let snapshot = await profile.once("value")

        let snap = snapshot.val()
        return snap.name
    },
    getUserRole: async (user_id) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        let profile = ref.child("users/" + user_id)
        let snapshot = await profile.once("value")

        let snap = snapshot.val()
        return snap.role
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