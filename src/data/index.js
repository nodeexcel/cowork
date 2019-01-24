
import admin from "firebase-admin";
import jwt from "jsonwebtoken"

export default {
    getUser: async (token) => {
        let user = jwt.verify(token, process.env.secretKey)
        if (!user.uid) {
            return false
        }
        user = await admin.auth().getUser(user.uid)
        user.id = user.uid

        let db = admin.database();
        let ref = db.ref("cowork");
        let profile = ref.child("users/" + user.id)
        let snapshot = await profile.once("value")

        let snap = snapshot.val()
        user.name = snap.name
        user.role = snap.role
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

    }
}