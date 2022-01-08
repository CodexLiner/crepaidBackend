const express = require('express');
const router = express.Router();
const trans = require('../models/transactions')
router.post('/' , async (req , res)=>{
    const newTrans = new trans({
        transactionId : req.body.transactionId,
        status :req.body.status,
        amount :req.body.amount,
        authkey : req.body.authkey,
        type :req.body.type,
    });
    try{
        const addTrans = await newTrans.save();
        res.json(addTrans)
    }catch(e){
        console.log(e)
    }


});
router.get('/:authkey' , async (req , res)=>{
    try{
        var authkey = req.params.authkey;
        const transactionList =  await trans.find({authkey : req.params.authkey});
        res.json(transactionList)
    }catch(e){
        console.log(e)
    }
})

// exports
module.exports = router;