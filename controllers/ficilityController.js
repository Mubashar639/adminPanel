
const facilityModel = require("../models/fasilitiesModel")
const errCatch = require("../utils/asynError")


exports.createFacility = errCatch(async (req, res, next) => {
    // console.log(req.body)
    const facility = await facilityModel.create(req.body)
    res.status(201).json({
        success: true,
        data: {
            facility
        }
    })
})



exports.getFacilities = errCatch(async (req, res) => {
    let filter={}
    if(req.body) filter=req.body
    const facilitys = await facilityModel.find(filter)
    res.status(200).json({
        success: true,
        data: {
            facilitys
        }
    })
})


exports.deleteaAll = errCatch(async (req, res) => {
    const query = facilityModel.deleteMany()
    const facility = await query
    res.status(204).json({
        success: true,
        data: null
    })
})

exports.updateFacility = errCatch(async (req, res, next) => {
    const facility = await facilityModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        facility
    })
})


exports.findFacility = errCatch(async (req, res, next) => {
    const facility = await facilityModel.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: {
            facility
        }
    })
})
exports.deleteFacility= errCatch(async (req, res, next) => {
    const facility = await facilityModel.findByIdAndDelete(req.params.id)
    res.status(204).json({
        success: true,
    })
})
