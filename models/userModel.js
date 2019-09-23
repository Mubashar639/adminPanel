const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const config = require("../config")

const UserModel = mongoose.Schema({
    email: {
        type: String,
        required: [true, "user must have the email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, " you entered email is not valid"]
    },
    name: {
        type: String,
        required: [true, "user must have the name"],
        trim: true,
        manlength: [30, " A user name must have max length 30 "]
    },
    password: {
        type: String,
        required: [true, "user must have the password"],
        select: false
    },

    passwordCreatedAt: Date,
    rule: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin",],
            message: "your rules must be user"
        }
    },

})

UserModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

UserModel.methods.correctPassword = async (password, dbpassword) => {
    return await bcrypt.compare(password, dbpassword)
}


module.exports = mongoose.model("Users", UserModel)

