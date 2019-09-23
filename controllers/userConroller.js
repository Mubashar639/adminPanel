
const userModel = require("../models/userModel")
const errCatch = require("../utils/asynError")
const ErrorClass = require("../utils/errClass")
const jwt = require("jsonwebtoken")
const config = require("../config")





const gettoken = (userID,name) => {
    return jwt.sign({ id: userID,name },
        config.secret, {
        expiresIn: "90d"
    })
}

exports.userLogin = errCatch(async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) {
        return next(new ErrorClass("you doesnot enter correct password and email", 400))

    }
    const user = await userModel.findOne({ email }).select("+password")
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new ErrorClass("you doesnot enter correct password and email", 404))
    }
    const token = gettoken(user._id,user.name)
    res.cookie("token", token, {
        expires: new Date(Date.now() + 90 + 24 + 60 + 60 + 1000),
        secret:"gfhgfjhgfjhfjhf",
        // ssecure:true,
        httpOnly:true
        
    })
    res.status(200).json({
        success: true,
        token
    })
})

exports.userRegister = errCatch(async (req, res, next) => {
    user = await userModel.create(req.body)

    const token = gettoken(user._id,user,name)
    res.status(201).json({
        success: true,
        token,
        data: {
            user
        }
    })
})



exports.finduser = errCatch(async (req, res, next) => {
    const user = await userModel.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
})

exports.getusers = errCatch(async (req, res) => {
    const users = await userModel.find()

    res.status(200).json(users)
})


exports.deleteaAll = errCatch(async (req, res) => {
    const query = userModel.deleteMany()
    const user = await query
    res.status(204).json({
        success: true,
        data: null
    })
})

exports.updateuser = errCatch(async (req, res, next) => {
    if (req.body.password) return next(new ErrorClass("you cannot update passord", 401))
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        user
    })
})

