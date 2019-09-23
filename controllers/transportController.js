
const transportModel = require("../models/transportModel")
const errCatch = require("../utils/asynError")


exports.createTransport = errCatch(async (req, res, next) => {
    const transport = await transportModel.create(req.body)
    res.status(201).json({
        success: true,
        data: {
            transport
        }
    })
})


exports.getTransport = errCatch(async (req, res) => {
    let filter={}
    if(req.body) filter=req.body
    const transport = await transportModel.find(filter)
    res.status(200).json({
        success: true,
        data: {
            transport
        }
    })
})


exports.deleteaAll = errCatch(async (req, res) => {
    const query = transportModel.deleteMany()
    const Transport = await query
    res.status(204).json({
        success: true,
        data: null
    })
})

exports.updateTransport = errCatch(async (req, res, next) => {
    const transport = await transportModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        transport
    })
})


exports.findTransport = errCatch(async (req, res, next) => {
    const transport = await transportModel.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: {
            transport
        }
    })
})

exports.deleteTransport= errCatch(async (req, res, next) => {
    const transport = await transportModel.findByIdAndDelete(req.params.id)
    res.status(204).json({
        success: true,
    })
})

