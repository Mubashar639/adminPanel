const OrderModel = require('../models/orderModer');

const orderController = {
    addOrder: (data, cb) => {
        const order = new OrderModel(data.body);
        return order.save((err, order) => {
            cb(err, order)
        });
    },

    getOrders: (data, cb) => {
        OrderModel.find({}, (err, products) => {
            if (err) return err;
            cb(null, products)
          });
    },
    change: (data, cb) => {
        OrderModel.findByIdAndUpdate(data.params.id,{...data.body},{new:true}, function (err, order) {
        
            cb(err, order)

        })
    },

    deleteAll: (data, cb) => {
        OrderModel.updateMany({ deleted: false, user: data.body.user }, { deleted: true }, (err, orders) => {
            cb(err, orders)
        })
    },
    deleteOne: (data, cb) => {
        OrderModel.findByIdAndUpdate(data.params.id, { orderDelete: true ,order:"cancled" }, (err, order) => {
            console.log(order)
            cb(err, order)

        })
    },
    update: (data, cb) => {

        OrderModel.findByIdAndUpdate(data.body._id, data.body, (err, newOrder) => {
            cb(err, { update: true })
        })

    },
    getByStatus: (data, cb) => {
        OrderModel.find({ status: data.body.status }, (err, orders) => {                       //_id:data.user._id
            cb(err, orders)
        })
    },
}
module.exports = orderController;