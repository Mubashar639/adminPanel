let mongoose = require('mongoose');

let sales_orderSchema = mongoose.Schema({
    
    orderNumber:{                  
        type:String,
        default:1,
    },
    orderDetail:[
        Array
    ],
    orderTrack: {
        type:String,
        default:"processing",
        enum:{
            values:["processing","dispatched","delivered","toCustomer"],
            message:"values must be processing, dispatched , delivered, or toCustomer"
        }
    },
    order:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","completed","cancled","toCustomer"],
            message:"values must be processing, dispatched , delivered, or toCustomer"
        }
    },
    orderDelete:{
        type:Boolean,
        default:false
    },
    orderUpdate:{
        type:Boolean,
        default:false
    }
   
})


module.exports = mongoose.model('orders',sales_orderSchema)
