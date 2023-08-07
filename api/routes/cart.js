const express = require('express');
const router = express.Router();
const Cart = require("../models/Cart");

const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require("./verifyToken");




//CREATE


router.post("/", verifyToken, async(req,res) => {


    const newCart = Cart(req.body);

    try {

        const savedCart = await newCart.save();

        res.status(200).json(savedCart);
        
    } catch (error) {
        

        res.status(500).json(error);
    }
})

//UPDATE


router.put("/:id", verifyTokenAndAuthorization, async(req,res) => {


    try {

        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});

        res.status(200).json(updatedCart);
        
    } catch (error) {
        
        console.log(error);
    }
})

//DELETE 

router.delete('/:id', verifyTokenAndAuthorization, async (req,res) =>{

    try {


        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json('product in cart has been deleted');
        
    } catch (error) {
        

        res.status(500).json(error);
    }

})


//GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res) => {


    try{


        const cart = await Cart.findOne({userId: req.params.userId});

        res.status(200).json(cart);


    }catch(error){



        res.status(500).json(error);

    }
})

//GET ALL CARTS

router.get("/", verifyTokenAndAdmin, async(req,res) =>{


    try {

        const carts = Cart.find();

        res.status(200).json(carts);
        
    } catch (error) {
            
        
        res.status(500).json(error);
    }

})


module.exports = router;