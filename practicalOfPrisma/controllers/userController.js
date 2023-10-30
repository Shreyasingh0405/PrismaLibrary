//bring in prisma & cookies
const prisma = require("../prisma/prismaClientFunction")
const cookieToken = require("../utils/cookies token")

//signUp User
exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.send({ status: 0, msd: "please provide all fields" })
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        //send user a token
        cookieToken(user, res)
    } catch (error) {
        return res.send(error.message)
    }
}

//login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("please provide email and password")
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error("USER NOT FOUND")
        }

        if (user.password !== password) {
            return res.send({ msg: "password not match" })
        }
        cookieToken(user, res)

    } catch (error) {
        return res.send(error.message)
    }
}

//logout User

exports.logOut = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.send({ status: 1, msg: "success" })
    } catch (error) {
        return res.send(error.message)
    }

}