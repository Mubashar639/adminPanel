const express = require('express');
const orderRoute = express.Router();
const controller = require("../controllers/ordercontroller")
const OrderModel = require("../models/orderModer")





    
orderRoute.post('/new', (req, res) => {


    controller.addOrder(req, (err, order) => {
        if (err) {
            res.json({ succuss:false, err: err })
        } else {
            res.json({ succuss:true, order: order })
        }
    })
}) 

orderRoute.post('/ChangeStatus', (req, res) => {


    controller.change(req, (err, order) => {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ order: order })
        }
    })
})


orderRoute.get('/all', (req, res) => {

    controller.getOrders(req, (err, orders) => {
        if(err){
            res.json({err:err});
        } else if(orders.length>0){
            res.status(200).json({orders:orders})
        }else {
            res.json({ result: "There are no orders" })
        }
    });
})


orderRoute.delete('/delete_all', (req, res) => {



    controller.deleteAll(req, (err, result) => {
        if(err){
            res.json({err:err})
        }else if (result) {
            res.json({ result: "All the orders have been deleted" })
        } else {
            res.json({ result: "There were no orders" })
        }

    })


})


orderRoute.delete('/delete', (req, res) => {

    controller.deleteOne(req, (err, result) => {
        if(err){
            res.json({err:err})
        }else if (result) {
            res.json({ success:true , order:result, })
        } else {
            res.json({ success:false , result: "Your order was not found" })
        }


    })
})


orderRoute.put('/update', (req, res) => {


    controller.update(req, (err, order) => {
        if(err){
            res.json({err:err})
        }else if (order.update) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    })
})

orderRoute.get('/get_order_by_status',(req,res)=>{
    controller.getByStatus(req,(err,orders)=>{
        if(err){
            res.json({err:err})
        }else if(orders){
            res.json(orders)
        }
    })
})









//TBS

orderRoute.delete('/all_delete',(req,res)=>{


    OrderModel.deleteMany({},(err,orders)=>{         
        if(orders.n>0){
            res.json({result:"All deleted"})
        }else{
            res.json({result:"There were no orders"})
        }
    })
})


orderRoute.post('/get_all',(req,res)=>{
    OrderModel.find({},(err,orders)=>{
        res.json(err||orders)
    })

})

//..................




module.exports = orderRoute;