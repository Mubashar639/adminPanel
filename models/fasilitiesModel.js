const  mongoose= require("mongoose") 

const Facility = mongoose.Schema({
    name:{
        type:String,
        required:[true,"A Facility Must have a Name"],
        unique: true
    },
    address:{
        type:String,
        required:[true,"A Facility Must have a Adress"]
    },
    phone:{
        type:Number,
        required:[true,"A Facility Must have a PhoneNumber"]
    },
    sexType:{
        type:String,
        required:[true,"A Facility must have a  male or female nature"],
        enum:{
            values:["male","female"],
            message:"sex Type must be male or female"
        }
    },
    securityLevel:{
        type:String,
        required:[true,"A Facility must have security Level"],
        enum:{
            values:["low","medium","mar"],
            message:"sex Type must be male or female"
        }
    },
    visitationDays:[String],
    visitTime:{
        type:Date,
        default:Date.now()
    },
    requirementForVisitation:String
}) 


module.exports = mongoose.model("Facility", Facility)
