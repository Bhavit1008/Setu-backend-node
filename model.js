var mongoose = require('mongoose');
  
var productSchema = new mongoose.Schema({
    productName: String,
    productCode: String,
    productHeight: String,
    productWidth: String,
    productCostPrice: String,
    productRetailingPrice: String,
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