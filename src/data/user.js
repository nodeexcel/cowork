
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
    getUserPlan: async (user_id, plan_id) => {
        let db = admin.database();
        let ref = db.ref("cowork");
        let snapshot = await ref.child("plans/" + plan_id).once("value")
        return snapshot.val()
    }
}