const {Order,productCart} = require("../models/order");

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id).populate("product.products","name price").exec((err,orders)=>{
        if(err){
            return res.status(400).json({
               error:"Not able to find the order in db"
            })
        }
        req.order = orders;
        next();
    })
}

exports.createOrder = (req,res)=>{
    // req.body.order.user = req.profile;
    // console.log("Nitesh is Awesome", req.body.userId);
    const order = new Order(req.body.order);
    console.log("Nitesh Good: ",order);
    order.save((err,order)=>{
        if(err){
            console.log("ERROR",err);
            return res.status(400).json({
                error:"Order is not saved in db"
            })
        }
         res.json({order});
    })
}

// exports.getOrder = (req,res)=>{
//     console.log("GETORDER",req.order);
//      res.json(req.order);
// }

exports.getAllOrders = (req,res) =>{
    Order.find().populate("user","_id name").exec((err,order)=>{
        console.log("ORDERS obtained by nothing",order);
        if(err){
            console.log("ERROR",err);
            return res.status(400).json({
                error:"All orders are not displaying"
            })
        }
        res.json(order);
        console.log("ORDERS obtained by response",order);
    })
}

exports.getOrder = (req,res)=>{
    console.log(req.order);
    Order.find({_id: req.params.orderId}).exec((err,order)=>{
        console.log("ORDER",order);
        if(err){
            console.log("ERROR",err);
            return res.status(400).json({
                error:"Order is not displaying"
            })
        }
        res.json(order);
        console.log("ORDERS obtained by response",order);

    })
}

exports.getAllOrderStatus = (req,res) =>{
    console.log("status",req.orderId);
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req,res) =>{
    console.log("objectId",req.params.orderId);
    console.log("CATEGORYNITESH",req.status);
    Order.findByIdAndUpdate(
        {_id : req.params.orderId },                                                                            
        {$set:  {status : req.body.status}},
        {new: true},
        // {useFindAndModify: true },
        (err,order)=>{
            console.log("order",order);
            if(err){
                console.log("ERROR",err);
                return res.status(400).json({
                    error:"Cannot update order status"
                })
            }
            res.json(order);
            console.log("UPDATESTATUS",order);
            // return res.status(200).json({
            //     message:"order is updated successfully"
            // })
        }
    )

    // Order.findOneAndUpdate(
    //     { _id: req.body.orderId},
    //      { $set:{status: req.body.status} } ,
    //     { new: true },
    //     (err, order) => {
    //     if (err) {
    //         console.log("ERROR",err);
    //         return res.status(400).json({error: "Cannot update order status"});
    //     }
    //     res.json(order);
    //  });
}

exports.removeOrder = (req,res)=>{
    const order = req.order;
    order.remove((err,order)=>{
        if(err){
            return res.send(400).json({
                error:"failed to remove the category"
            })
        }
        res.json({
            message:"Successfully removed",order
            //message:`${removeCategory} is deleted`
        });
    })
 }

//  exports.userPurchaseList = (req,res) =>{
//     Order.find({user:req.profile._id}).populate("user","_id name").exec((err,order)=>{
//         console.log("ORDERS",order);
//         if(err){
//             console.log("ORDERS ERROR",order);
//             return res.status(400).json({
//                 error:"No order in this account"
//             })
//         }
//         return res.json(order);
//     })
// }