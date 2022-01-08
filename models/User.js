const mongoose = require('mongoose');

const user = mongoose.Schema ({
    _id :{
        type: String ,
        required : true ,
    } ,
    name : String ,
    mobile :{
        type: String ,
        required : true ,
    } ,
    authkey : String,
    panNumber : String,
    dateBirth : String,  

});

// exports 
module.exports = mongoose.model('User' , user)