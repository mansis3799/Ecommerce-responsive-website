// const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema;

// const productsCartSchema=new mongoose.Schema({
//     product:{
//         type:ObjectId,
//         ref:"Product"
//     },
//     name:String,
//     count:Number,
//     price:Number
// })

// const productCart=mongoose.model("Product",productsCartSchema);

// const orderSchema=new mongoose.Schema(
//   {
//    products:[productsCartSchema], 
//    transaction_id:{},
//    amount:{type:Number},
//    address:String,
//    status:{
//        type:String,
//        default:"Recieved",
//        enum:["Cancellled","Delivered","Recieved","Shipped","Processing"]
//    },
//    updated:Date,
//    user:{
//        type:ObjectId,
//        ref:"User"
//    }
// },{timestamps:true});

// const Order=mongoose.model("Order",orderSchema);

//  module.exports = {Order,productCart};

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  name: String,
  count: Number,
  price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

// const UserCartSchema = new mongoose.Schema({
//   user: {
//     type: ObjectId,
//     ref: "user"
//   },
//   name: String,
//   email: String
// });

// const UserCart = mongoose.model("UserCart", UserCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    // user : [{ type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status:{
               type:String,
               default:"Recieved",
               enum:["Cancelled","Delivered","Recieved","Shipped","Processing"]
           },
    updated: Date,
    // user: [UserCartSchema],
    userId: ObjectId,
  },
    { timestamps: true }
       );
       
const Order = mongoose.model("Order", OrderSchema);
       
module.exports = { Order, ProductCart };