const express = require("express")
const transportRouter = express.Router()
const transportController = require("../controllers/transportController")
const authConstrollers = require("../controllers/authController")


transportRouter
    .route("/")
    .get(transportController.getTransport)
    .post(authConstrollers.authenticate,
        authConstrollers.Permistions("admin"),
        transportController.createTransport)
    .delete(authConstrollers.authenticate,
        authConstrollers.Permistions("admin"),
        transportController.deleteaAll);

transportRouter
    .route("/:id")
    .get(transportController.findTransport)
    .delete(authConstrollers.authenticate,
        authConstrollers.Permistions("admin"),
        transportController.deleteTransport)
    .patch(authConstrollers.authenticate,
        authConstrollers.Permistions("admin"),
        transportController.updateTransport)


module.exports = transportRouter
