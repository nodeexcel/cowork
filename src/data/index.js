import jwt from "jsonwebtoken"

export default {
    login: async (username, password) => {
        if (password == "java@123") {
            let token = jwt.sign({
                username: username
            }, password)

            return {
                id: 1,
                username: username,
                token: token
            }
        } else {
            throw new Error("Invalid Password")
        }
    }
}