const mongoose = require("mongoose")

const Tranportation = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A transport Must have a Name"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "A tranport Must have a PhoneNumber"]
    },
    facilities: [String ],
    ticketPrice: {
        type:{
            type:String,
            default:"adult",
            enum:{
                values:["adult", "child"],
                message:"ticket type must be adlut or child"
            }
        },
        price:Number
    },
    operationDays: {
        type: Number,
        default: 5
    },
    pickUpLocation: {
        // goeloction
        type:{
            type:String,
            default:"point"
        },
        coordinates:[Number]
    },
})


module.exports = mongoose.model("Tranportation", Tranportation)
