const Category = require("../models/category");
const { check, validationResult } = require("express-validator");


exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err || !cate){
            return res.status(400).json({
               error:"Not able to find the category in db"
            })
        }
        req.category = cate;
        next();
    })
}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    console.log(req)
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Category is not saved in db"
            })
        }
        res.json ({category});
    })
}

exports.getCategory = (req,res)=>{
    console.log("category",req.category);
    res.json(req.category);
}

exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            console.log("ERROR",err);
            return res.status(400).json({
                error:"Not categories found"
            })
        }
        res.json(categories);
    })
}

exports.updateCategory = (req,res)=>{
    //const category = Category(req.body.name);
    console.log("CATEGORYNITESH", req.body);
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedcategory)=>{
        if(err){
            console.log("ERROR",err);
            return res.status(400).json({
                error:"failed to update category"
            })
        }
        res.json(updatedcategory);
    })
}

exports.removeCategory = (req,res)=>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.send(400).json({
                error:"failed to remove the category"
            })
        }
        res.json({
            message:"Successfully removed"
            //message:`${removeCategory} is deleted`
        });
    })
}