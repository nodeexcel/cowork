import admin from "firebase-admin";

export default {
    init: () => {
        var serviceAccount = require("./../cowork-af0c4-firebase-adminsdk-96969-6bf6336c10.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cowork-af0c4.firebaseio.com"
        });
    }
}