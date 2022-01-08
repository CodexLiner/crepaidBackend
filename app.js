const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//routes
const loginRoutes = require('./routes/loginRoute');
const bankRoute = require('./routes/bankDetails')
const transaction = require('./routes/transactions')

app.use(bodyParser.json());
app.use('/crepaid_login' , loginRoutes)
app.use('/crepaid_bank_details' , bankRoute )
app.use('/payments' , transaction )




//db conection 
mongoose.connect('mongodb+srv://crepaid:Gopal11@cluster0.ihgln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , ()=>{
    console.log('db connected!');
});
// server start
app.listen(3000); 