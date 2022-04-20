const mongoose = require('mongoose');
const GiftSchema = new mongoose.Schema({
   gift_name:{
       type:String,
       required:true,
       unique:true,
   },
   gift_price_in_rubies:{
       type:Number,
       required:true,
   },
   gift_image:{
       type:String,
       required:true,
       unique:true,
   },
})
const Gift = mongoose.model('Gift',GiftSchema);
module.exports=Gift
