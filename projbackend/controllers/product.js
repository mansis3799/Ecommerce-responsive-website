const product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req,res,next,id)=>{
    product.findById(id).populate("category").exec((err,products)=>{
        if(err){
            return res.status(400).json({
               error:"Not able to find the product in db"
            })
        }
        req.product = products;
        next();
    })
}

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with image"
            })
        }
        //Destructure the fields
       const {name,description,price,category,stock} = fields;
     
       if(!name|| !description || !price || !category || !stock){
           res.status(400).json("All field are required");
       }

        //Restrictions on filed
        let products = new product(fields);

        //Handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                res.status(400).json({
                    error:"File size is too big"
                })
            }
            products.photo.data = fs.readFileSync(file.photo.path);
            products.photo.contentType = file.photo.type;
        }
        console.log(products);

        //save to the db
        products.save((err,products)=>{
            if(err){
                return res.status(400).json({
                    error:"Product not save in db"
                })
            }
            res.json(products);
        })
    })
};

exports.getProduct = (req,res) =>{
    console.log("product",req);
    req.product.photo = undefined;
     res.json(req.product);
}

//Middleware
exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with image"
            })
        }
        //Updation Code
        let products = req.product;
        products = _.extend(products,fields);

        //Handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                res.status(400).json({
                    error:"File size is too big"
                })
            }
            products.photo.data = fs.readFileSync(file.photo.path);
            products.photo.contentType = file.photo.type;
        }
        //console.log(products);

        //save to the db
        products.save((err,products)=>{
            if(err){
                return res.status(400).json({
                    error:"Updation failed"
                })
            }
            res.json(products);
        })
    })
}

exports.removeProduct = (req,res)=>{
    const product = req.product;
    product.remove((err,removeProduct)=>{
        if(err){
            res.send(400).json({
                error:"failed to remove the product"
            })
        }
        res.json({
            message:"Successfully removed",removeProduct
            //message:`${removeCategory} is deleted`
        });
    })
}

exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit): 8;
    let sortBy =  req.query.sortBy ? req.query.sortBy:"_id";
    product.find().select("-photo").populate("category").sort([[sortBy,"asc"]]).limit(limit).exec((err,products)=>{
        if(err){
            return res.status(400).json({
            error:"All products are not displayed"
            })
        }
        res.json(products);
    })
}

exports.updateStock = (req,res,next) =>{
    let myoperations = req.body.order.products.map(prod=>{
        return{
            updateOne:{
                filter : {_id: prod._id},
                update : {$set: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })

    product.bulkWrite(myoperations,{},(err,products)=>{
        if(err){
            res.status(400).json({
                error:"Bulk operations failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res)=>{
    product.distinct("category",{},(err,category) =>{
        if(err){
            res.status(400).json({
                error:"No distinct category found"
            })
        }
        res.json(category);
    })
}