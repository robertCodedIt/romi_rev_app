const router = require('express').Router();

router.get('/',(req,res)=>{

res.send('router is connected');

})

module.exports=router;