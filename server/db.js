require('dotenv').config()
const mongoose = require('mongoose');
const connectDB=()=>{
const localDB = process.env.DB_CONNECTION_STRING;
mongoose.connect(localDB, {
  useNewUrlParser: "true",

})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
}
module.exports = connectDB