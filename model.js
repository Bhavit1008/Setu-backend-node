var mongoose = require('mongoose');
  
var productSchema = new mongoose.Schema({
    productName: String,
    productCode: {
        required: true,
        unique: true,
        type: String},
    productCategory: String,
    productHeight: Number,
    productWidth: Number,
    productCostPrice: Number,
    productRetailingPrice: Number,
    additionalComment: String,
    productImage: Array
    // {
    //     data: Buffer,
    //     contentType: String
    // }
    // ,
    // autocadeImage:
    // {
    //     data: Buffer,
    //     contentType: String
    // }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Product', productSchema)