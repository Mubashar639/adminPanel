const express = require("express")
const userRouter = express.Router()
const userconstrollers = require("../controllers/userConroller")
const authConstrollers = require("../controllers/authController")


userRouter
.post("/login",userconstrollers.userLogin)


userRouter
.post("/signup",userconstrollers.userRegister)


userRouter
    .route("/")
    // authConstrollers.authenticate,authConstrollers.Permistions("admin"),
    .get(userconstrollers.getusers)
    .delete(authConstrollers.authenticate,authConstrollers.Permistions("admin") ,userconstrollers.deleteaAll)
userRouter
    .route("/:id")
    .get(authConstrollers.authenticate,authConstrollers.Permistions("admin") ,userconstrollers.finduser)
    .patch(authConstrollers.authenticate,authConstrollers.Permistions("admin") ,userconstrollers.updateuser)

module.exports = userRouter
