
const { promisify } = require("util");
const errCatch = require("../utils/asynError")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const ErrorClass = require("../utils/errClass")
const config= require("../config")

exports.authenticate = errCatch(async (req, res, next) => {
    let token=""
    // console.log(req.headers)
   if( req.headers.authorization)  token = req.headers.authorization.split(" ")[1]
    if (!token) return next(new ErrorClass("you are not login in please login first", 401))
    const varify = await promisify(jwt.verify)(token, config.secret)

    // console.log(userInstance.correctPassword())
    const currentUser = await userModel.findById(varify.id)
    if (!currentUser) {
        return next(new ErrorClass("that token is not beloging to any user", 404))
    }
    // grand  access to protected route
    req.user = currentUser
    next()
})

exports.Permistions = (...para) => {
    return (req, res, next) => {
        if (!para.includes(req.user.rule)) {
            return next(new ErrorClass("you donot have permisstion to do this", 403))
        }
        next()
    }
}
