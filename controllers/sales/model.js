const mongoose = require('mongoose');

const options = {
    "timestamps": true,
};
const salesSchema = new mongoose.Schema({
    location:{
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    phone: {
        type: Number
    },
    bill_number: {
        type: String,
        trim: true
    },
    bill_date: {
        type: Date,
        trim: true
    },
    month: {
        type: String,
        trim: true
    },
    year: {
        type: String,
        trim: true
    },
    barcode: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim:true
    },
    division: {
        type: String,
        trim: true
    },
    section: {
        type: String,
        trim: true
    },
    department: {
        type: String
    },
    product_quantity: {
        type: String,
        trim: true
    },
    net_amount: {
        type: String,
        trim: true
    }
},options);

var SalesModel = mongoose.model('Sales', salesSchema );
module.exports = SalesModel