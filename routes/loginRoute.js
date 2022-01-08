const express = require('express');
const User = require('../models/User');
const {v4 : uuidv4} = require('uuid')

// home route for login
const router = express.Router();
router.post('/' , async(req , res) =>{
    const user = new User ({
        _id : req.body.mobile,
        name : req.body.name ,
        mobile : req.body.mobile ,
        authkey : req.body.mobile + '-'+uuidv4(),
        panNumber : req.body.panNumber,
        dateBirth : req.body.dateBirth
    });
    try{
        const userCreated = await user.save();
        res.json(userCreated);
    }catch(e){};

});

// get user details
router.get('/:mobile' , async (req , res ) =>{
    const deatils = await User.findById(req.params.mobile);
    res.json(deatils);
})

// update user informatiion

//exporting routes
module.exports = router;