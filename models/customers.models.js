const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    emailAddress: String,
    phoneNumber:String,
    dob:String,
    depatment:String
}) 

const customerModel = mongoose.model('customer', customerSchema)

module.exports = customerModel;