'use strict';
require('dotenv').config();
const app = require('express')();
const port = process.env.PORT|| 3001;
const route_one = require('./routes/user.js');
// DATABASE CONNECTION
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  console.log('database is connected')
  const collection = client.db("test").collection("devices");
  console.log(collection)
  // perform actions on the collection object
  client.close();
});



// routes
app.use('/users',route_one)
// app.use('/users',route_one)
// app.use('/users',route_one)
// app.use('/users',route_one)
// app.use('/users',route_one)
// models
class User {
constructor(name,age,birthday,sign){
this.name = name;
this.age = age;
this.birthday = birthday;
this.sign = sign;
}

}

let data = new User('Robert',24,'7/25/1997','leo')
app.get('/',(req,res)=>{
    res.send([data])
    console.log(data)
})

app.listen(port,()=>{
    console.log('listening on port:', port)
})